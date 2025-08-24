export default async function TaskDetails({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  return <h1>Task {taskId}</h1>;
}
