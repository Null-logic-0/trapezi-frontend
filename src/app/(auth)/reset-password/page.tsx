import ResetPassword from "@/components/Auth/ResetPassword";

type ResetPasswordProps = {
  searchParams: Promise<{ token: string }>;
};

async function ResetPasswordPage({ searchParams }: ResetPasswordProps) {
  const { token } = await searchParams;

  return (
    <div className="h-screen mx-auto flex justify-center items-center">
      <ResetPassword token={token} />
    </div>
  );
}

export default ResetPasswordPage;
