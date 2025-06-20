import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema, TUpdateProfile } from '@/lib/validators/update-profile';
import { GetProfile } from '@/actions/auth.action';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/user.action';

interface ProfileFormProps {
  profile: GetProfile | null
}
export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<TUpdateProfile>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      fullName: ""
    }
  });

  const onSubmit = (data: TUpdateProfile) => {
    startTransition(async () => {
      const toastId = toast.loading("Đang cập nhật thông tin...");
      const res = await updateProfile({
        fullName: data.fullName
      });
      console.log(res);
      
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Cập nhật thông tin thành công");
      } else {
        toast.error(res.message);
      }
    })
  }


  useEffect(() => {
    if (!profile) return;
    form.reset({
      fullName: profile.fullName
    })
  }, [form, profile])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-4'>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Họ và Tên
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={"John Doe"}
                  className="col-span-3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" defaultValue={profile?.email} disabled />
        </div>
        <Button
          type='submit'
          className='ml-auto block mt-10'
          disabled={!form.formState.isDirty || isPending}
        >
          {isPending ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </form>
    </Form>
  );
} 