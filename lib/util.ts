export function formatMessageDate(messageDate: Date): string {
  const now = new Date()
  if (
    messageDate.getFullYear() !== now.getFullYear() ||
    messageDate.getMonth() !== now.getMonth() ||
    messageDate.getDate() !== now.getDate()
  ) {
    // If the message was sent on a different day, display the date
    return messageDate.toLocaleDateString('en-US')
  } else if (now.getTime() - messageDate.getTime() > 24 * 60 * 60 * 1000) {
    // If the message was sent more than 24 hours ago, display "Yesterday"
    return 'Yesterday'
  } else {
    // Otherwise, display the time
    return messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
