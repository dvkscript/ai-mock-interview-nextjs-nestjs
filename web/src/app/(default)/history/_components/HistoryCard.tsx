"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, MessageSquare, ChevronRight, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface HistoryCardProps {
  id: string
  position: string
  date: string
  score: number
  feedback: string
  status: "completed" | "in-progress" | "scheduled"
  onDelete: (id: string) => void
}

const statusConfig = {
  completed: {
    label: "Hoàn thành",
    variant: "default" as const,
    className: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  },
  "in-progress": {
    label: "Đang diễn ra",
    variant: "default" as const,
    className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  },
  scheduled: {
    label: "Đã lên lịch",
    variant: "default" as const,
    className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  },
}

export function HistoryCard({ id, position, date, score, feedback, status, onDelete }: HistoryCardProps) {
  const statusInfo = statusConfig[status]
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-primary/70 transition-all">
              {position}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={statusInfo.variant} className={statusInfo.className}>
                {statusInfo.label}
              </Badge>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn xóa lịch sử phỏng vấn này không? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Đang xóa..." : "Xóa"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{score}/100</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground/90 line-clamp-2">{feedback}</p>
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" className="group-hover:text-primary text-muted-foreground hover:bg-primary/10">
                <MessageSquare className="mr-2 h-4 w-4" />
                Xem phản hồi
              </Button>
              <Button variant="ghost" size="sm" className="group-hover:text-primary text-muted-foreground hover:bg-primary/10">
                Chi tiết
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 