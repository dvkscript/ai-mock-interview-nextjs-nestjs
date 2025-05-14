"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface HistoryFiltersProps {
  onSearch: (value: string) => void
  onTimeFilter: (value: string) => void
  onScoreFilter: (value: string) => void
}

export function HistoryFilters({ onSearch, onTimeFilter, onScoreFilter }: HistoryFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm vị trí..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Select onValueChange={onTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="today">Hôm nay</SelectItem>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onScoreFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Điểm số" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="excellent">Xuất sắc (90-100)</SelectItem>
            <SelectItem value="good">Tốt (70-89)</SelectItem>
            <SelectItem value="average">Trung bình (50-69)</SelectItem>
            <SelectItem value="poor">Yếu (0-49)</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
} 