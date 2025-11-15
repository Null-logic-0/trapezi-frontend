import ConfirmRegistration from "@/components/Auth/ConfirmRegistration";

type ConfirmProps = {
  searchParams: Promise<{ token: string }>;
};

async function ConfirmPage({ searchParams }: ConfirmProps) {
  const { token } = await searchParams;
  return <ConfirmRegistration token={token} />;
}

export default ConfirmPage;
