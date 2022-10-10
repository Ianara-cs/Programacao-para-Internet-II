
interface FormProps {
  children: string
}

export function Form ({children}: FormProps) {
    return (
        <form>
          {children}
        </form>
    )
}