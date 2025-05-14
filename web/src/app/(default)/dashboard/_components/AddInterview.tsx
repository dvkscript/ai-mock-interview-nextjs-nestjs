"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import AddInterviewModal from './AddInterviewModal'

const AddInterview = () => {
    return (
        <AddInterviewModal
            trigger={
                <Button
                    size={"lg"}
                    variant={"primary"}
                >
                    <Plus />
                    Phỏng vấn mới
                </Button>
            }
        />
    )
}

export default AddInterview