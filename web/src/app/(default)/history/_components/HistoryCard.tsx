"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, ChevronRight, Trash2 } from "lucide-react"
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
import { useMemo, useState } from "react"
import { GetJobAndCountAll } from "@/actions/job.action"
import { StatusBadgeColor, StatusText } from "@/lib/utils"
import dayjs from "@/lib/utils/dayjs"
import { JobStatus } from "@/lib/api/Types/job"

type HistoryCardProps = GetJobAndCountAll["rows"][number] & {
  onDelete: (id: string) => Promise<void>;
  onRedirect: () => void;
};

export function HistoryCard({
  id,
  position,
  status,
  averageScore,
  createdAt,
  description,
  yearsOfExperience,
  onDelete,
  onRedirect
}: HistoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const createdFormat = useMemo(() => dayjs(createdAt).format("HH:mm / DD-MM-YYYY"), [createdAt])

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
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm gap-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-primary/70 transition-all">
              {position}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${StatusBadgeColor[status]}`}>
                {StatusText[status]}
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
            <Badge variant={"outline"}>
              {yearsOfExperience} năm kinh nghiệm
            </Badge>
            <p className="text-sm text-muted-foreground/90 line-clamp-2">{description}</p>

            <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>
                  {createdFormat}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{averageScore}/100</span>
              </div>
              <Button
                onClick={() => {
                  if (onRedirect) {
                    onRedirect()
                  }
                }}
                variant="ghost"
                size="sm"
                className="ml-auto group-hover:text-primary text-muted-foreground hover:bg-primary/10"
              >
                {
                  status === JobStatus.COMPLETED ? (
                    <>
                      Xem đánh giá
                    </>
                  ) : (
                    <>
                      Tiếp tục
                    </>
                  )
                }
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 