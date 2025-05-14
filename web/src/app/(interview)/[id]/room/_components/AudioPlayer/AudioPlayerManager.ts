export interface AudioController {
  id: string;
  play: () => void;
  pause: () => void;
  onEnded: () => void;
  isReady: () => boolean | Promise<void>;
}

class AudioPlayerManager {
  private players: Map<string, AudioController> = new Map();
  private currentPlayingId: string | null = null;
  private registerWaiters: Map<string, () => void> = new Map();
  private endedWaiters: Map<string, () => void> = new Map();

  register(player: AudioController) {
    this.players.set(player.id, player);
    this.registerWaiters.get(player.id)?.();
    this.registerWaiters.delete(player.id);
  }

  unregister(player: AudioController) {
    this.players.delete(player.id);
    if (this.currentPlayingId === player.id) {
      this.currentPlayingId = null;
    }
  }

  pauseAll(exceptId?: string) {
    for (const [id, player] of this.players) {
      if (id !== exceptId) {
        player.pause();
      }
    }
  }

  playOnlyById(id: string) {
    const target = this.players.get(id);
    if (!target) return;

    this.pauseAll(id);
    target.play();
    this.currentPlayingId = id;

    // Gắn callback khi kết thúc
    target.onEnded = () => {
      if (this.currentPlayingId === id) {
        this.currentPlayingId = null;
      }
    };
  }

  stopAll() {
    for (const player of this.players.values()) {
      player.pause();
    }
    this.currentPlayingId = null;
  }

  isPlaying(id: string) {
    return this.currentPlayingId === id;
  }

  getCurrentPlayerId() {
    return this.currentPlayingId;
  }

  async waitUntilRegistered(id: string): Promise<void> {
    if (this.players.has(id)) return;
    return new Promise((resolve) => {
      this.registerWaiters.set(id, resolve);
    });
  }

  async waitUntilReady(id: string): Promise<void> {
    await this.waitUntilRegistered(id);
    const player = this.players.get(id)!;
    const ready = player.isReady();
    return ready instanceof Promise ? ready : Promise.resolve();
  }

  async waitUntilEnded(id: string): Promise<void> {
    const player = this.players.get(id);
    if (!player) {
      return Promise.reject(new Error(`Player with id ${id} not found`));
    }
  
    return new Promise<void>((resolve) => {
      this.endedWaiters.set(id, resolve);
  
      // Gắn lại onEnded để khi audio kết thúc sẽ resolve
      player.onEnded = () => {
        if (this.currentPlayingId === id) {
          this.currentPlayingId = null;
        }
        this.endedWaiters.get(id)?.(); // Gọi resolve
        this.endedWaiters.delete(id);  // Dọn dẹp
      };
    });
  }
}

export const audioPlayerManager = new AudioPlayerManager();
