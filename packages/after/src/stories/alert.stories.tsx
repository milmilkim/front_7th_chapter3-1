import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: "success",
    children: (
      <>
        <AlertTitle>성공</AlertTitle>
        <AlertDescription>
          변경 사항이 성공적으로 저장되었습니다.
        </AlertDescription>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: (
      <>
        <AlertTitle>안내</AlertTitle>
        <AlertDescription>
          상황을 이해하는 데 도움이 되는 정보성 메시지입니다.
        </AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>
          요청을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.
        </AlertDescription>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "info",
    children: (
      <AlertDescription>제목 없이 설명만 있는 알림입니다.</AlertDescription>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4" style={{ width: "500px" }}>
      <Alert variant="success">
        <AlertTitle>성공</AlertTitle>
        <AlertDescription>변경 사항이 저장되었습니다.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>안내</AlertTitle>
        <AlertDescription>이메일을 확인하여 인증을 완료해주세요.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>문제가 발생했습니다. 다시 시도해주세요.</AlertDescription>
      </Alert>
    </div>
  ),
};
