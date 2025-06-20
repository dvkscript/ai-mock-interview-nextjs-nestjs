import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useCallback, useState, useTransition } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/stores/userStore';
import { toast } from 'sonner';
import { deleteFile, uploadFile } from '@/actions/upload.action';
import { updateProfile } from '@/actions/user.action';

export function ProfileAvatar() {
  const { profile } = useUserStore()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("File không đúng định dạng!")
      } else if (file.size > 2 * 1024 * 1024) {
        return toast.error("File không được vượt quá 2MB!")
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = useCallback(() => {
    if (!selectedFile || !profile) return;
    startTransition(async () => {
      const toastId = toast.loading("Đang tải lên...");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("userId", profile.id);

      const uploadRes = await uploadFile(formData);
      
      const uploadData = uploadRes.data;

      if (!uploadRes.ok || !uploadData) {
        toast.dismiss(toastId);
        toast.error(uploadRes.message)
      } else {
        const res = await updateProfile({
          thumbnail: uploadData.url,
          thumbnailId: uploadData.id
        });

        toast.dismiss(toastId);
        if (!res.ok) {
          toast.error(res.message);
          deleteFile([
            uploadData.id,
          ]);
        } else {
          setSelectedFile(null);
          setPreviewUrl(null);
          toast.success("Cập nhật thành công!")
        }
      }
    })
  }, [selectedFile, profile,]);

  return (
    <div className="relative">
      <Avatar className="size-40">
        <AvatarImage src={profile?.thumbnail} alt="User avatar" />
        <AvatarFallback>
          {profile?.fullName?.charAt?.(0)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative size-40">
                <Avatar className="size-40">
                  <AvatarImage src={previewUrl || profile?.thumbnail} alt="Preview" />
                  <AvatarFallback>
                    {profile?.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Label
                  htmlFor="avatar-upload"
                  className="cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Chọn ảnh
                </Label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  PNG, JPG hoặc GIF (tối đa 2MB)
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}>
                Hủy
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isPending}
              >
                {
                  isPending ? "Đang tải lên..." : "Tải lên"
                }
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 