import { cn } from '../../utils/cn'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn('bg-white rounded-lg border shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}