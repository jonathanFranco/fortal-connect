"use client"

import type React from "react"
import { forwardRef, useRef, useEffect } from "react"
import { IMask } from "react-imask"
import { Input } from "@/components/ui/input"

interface InputMaskProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref"> {
  mask: string
  definitions?: Record<string, RegExp>
  onAccept?: (value: string, mask: any) => void
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, definitions, onAccept, onChange, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const maskRef = useRef<IMask.InputMask<any> | null>(null)

    // Inicializa a máscara quando o componente é montado
    useEffect(() => {
      if (!inputRef.current) return

      const maskInstance = IMask(inputRef.current, {
        mask,
        definitions,
      })

      maskRef.current = maskInstance

      maskInstance.on("accept", () => {
        if (onChange && maskInstance.value !== value) {
          const event = {
            target: {
              name: inputRef.current?.name,
              value: maskInstance.value,
            },
          } as React.ChangeEvent<HTMLInputElement>
          onChange(event)
        }

        if (onAccept) {
          onAccept(maskInstance.value, maskInstance)
        }
      })

      return () => {
        maskInstance.destroy()
        maskRef.current = null
      }
    }, [mask, definitions, onAccept])

    // Atualiza o valor da máscara quando o valor externo muda
    useEffect(() => {
      if (maskRef.current && value !== undefined && value !== maskRef.current.value) {
        maskRef.current.value = value
      }
    }, [value])

    // Função para sincronizar as refs
    const setRefs = (element: HTMLInputElement) => {
      // Atualiza a ref interna
      inputRef.current = element

      // Atualiza a ref fornecida pelo componente pai
      if (typeof ref === "function") {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    // Usamos defaultValue em vez de value para evitar o erro de componente não controlado
    return <Input ref={setRefs} inputMode="numeric" defaultValue={value} {...props} />
  },
)

InputMask.displayName = "InputMask"

export { InputMask }
