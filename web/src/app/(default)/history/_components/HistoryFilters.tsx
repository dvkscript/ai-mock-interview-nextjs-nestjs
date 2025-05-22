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
  onExperienceFilter: (value: string) => void
  onScoreFilter: (value: string) => void
  values: {
    search: string
    experienceFilter: string
    scoreFilter: string
  }
  onSubmit: () => void
}

const experienceFilterOptions = [
  { value: "all", label: "Tất cả" },
  { value: "0", label: "Không có kinh nghiệm" },
  { value: "1", label: "1 năm kinh nghiệm" },
  { value: "2", label: "2 năm kinh nghiệm" },
  { value: "3", label: "3 năm kinh nghiệm" },
  { value: "4", label: "4 năm kinh nghiệm" },
  { value: "5+", label: "5+ năm kinh nghiệm trở lên" },
]

const scoreFilterOptions = [
  { value: "all", label: "Tất cả" },
  { value: "excellent", label: "Xuất sắc (90-100)" },
  { value: "good", label: "Tốt (70-89)" },
  { value: "average", label: "Trung bình (50-69)" },
  { value: "poor", label: "Yếu (0-49)" }
];

export function HistoryFilters({ onSearch, onExperienceFilter, onScoreFilter, values, onSubmit }: HistoryFiltersProps) {
  const selectValidate = (value: string, options: { value: string, label: string }[]) => {
    const option = options.find(option => option.value === value)
    return option ? option.value : "all"
  }

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
          value={values.search}
        />
      </div>
      <div className="flex gap-2">
        <Select
          onValueChange={onExperienceFilter}
          value={selectValidate(values.experienceFilter, experienceFilterOptions)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Năm kinh nghiệm" />
          </SelectTrigger>
          <SelectContent>
            {experienceFilterOptions.map((option) => {
              return (
                <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Select
          onValueChange={onScoreFilter}
          value={selectValidate(values.scoreFilter, scoreFilterOptions)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Điểm số" />
          </SelectTrigger>
          <SelectContent>
            {scoreFilterOptions.map((option) => {
              return (
                <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={onSubmit}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
} 