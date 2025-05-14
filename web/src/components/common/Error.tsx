import React, { useEffect, useMemo } from 'react';
import NotFound from './NotFound';
import { Button } from '../ui/button';
import { useRouter } from 'next-nprogress-bar';

const status = {
    "200": {
        "title": "Thành công",
        "description": "Yêu cầu đã thành công."
    },
    "201": {
        "title": "Đã tạo",
        "description": "Yêu cầu đã thành công và tài nguyên mới đã được tạo."
    },
    "204": {
        "title": "Không có nội dung",
        "description": "Máy chủ đã xử lý yêu cầu thành công, nhưng không trả về nội dung nào."
    },
    "400": {
        "title": "Yêu cầu không hợp lệ",
        "description": "Máy chủ không thể hiểu yêu cầu do cú pháp không hợp lệ."
    },
    "401": {
        "title": "Chưa xác thực",
        "description": "Yêu cầu yêu cầu xác thực người dùng."
    },
    "403": {
        "title": "Bị cấm",
        "description": "Máy chủ đã hiểu yêu cầu, nhưng từ chối thực hiện."
    },
    "404": {
        "title": "Không tìm thấy",
        "description": "Không thể tìm thấy tài nguyên được yêu cầu."
    },
    "405": {
        "title": "Phương thức không được phép",
        "description": "Phương thức được chỉ định trong yêu cầu không được phép cho tài nguyên này."
    },
    "409": {
        "title": "Xung đột",
        "description": "Yêu cầu không thể hoàn thành do xung đột với trạng thái hiện tại của tài nguyên."
    },
    "500": {
        "title": "Lỗi máy chủ nội bộ",
        "description": "Đã xảy ra lỗi không mong đợi trên máy chủ."
    },
    "502": {
        "title": "Cổng không hợp lệ",
        "description": "Máy chủ đang hoạt động như một cổng hoặc proxy và nhận được phản hồi không hợp lệ từ máy chủ thượng nguồn."
    },
    "503": {
        "title": "Dịch vụ không khả dụng",
        "description": "Máy chủ hiện không thể xử lý yêu cầu do quá tải hoặc bảo trì tạm thời."
    }
}

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const Error: React.FC<ErrorProps> = ({
    error,
}) => {
    const route = useRouter();
    const msg = useMemo(() => status[error.message as keyof typeof status], [error]);

    useEffect(() => {
        console.error(error);
    }, [error, route]);

    if (error.message === "404") {
        return <NotFound />
    }

    return (
        <div className='flex flex-col items-center justify-center gap-y-3 p-5 h-full w-full'>
            <span className='text-5xl'>
                😔
            </span>
            <h1 className='font-bold text-4xl text-center'>
                {msg?.title || "Lỗi không xác định"}
            </h1>
            {
                !!msg ? (
                    <>
                        <h4 className='mt-2'>
                            {msg?.title}
                        </h4>
                        <h4 className='mt-2'>
                            {msg?.description}
                        </h4>
                    </>
                ) : (
                    <h4 className='mt-2'>
                        {error.message}
                    </h4>
                )
            }
            <Button
                onClick={
                    () => window.location.reload()
                }
                color='primary'
                type='button'
            >
                Thử lại
            </Button>
            <button
                type='button'
                onClick={() => {
                    route.back();
                }}
                className='underline'
            >
                Trở lại
            </button>
        </div>
    );
};

export default Error;