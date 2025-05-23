import { CodeBlock, createCssVariablesTheme } from "basehub/react-code-block"
import { ReactNode } from "react"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import styles from "./code-block.module.css"

interface CodeBlockProps {
  snippets: ComponentProps<typeof CodeBlock>["snippets"]
  childrenTop?: ReactNode
  childrenBottom?: ReactNode
  singleFile?: boolean
}

const theme = createCssVariablesTheme({
  name: "montek",
  variablePrefix: "--msk-",
  variableDefaults: {
    "color-text": "var(--msk-color-text)",
    "token-constant": "var(--msk-token-constant)",
    "token-string": "var(--msk-token-string)",
    "token-comment": "var(--msk-token-comment)",
    "token-keyword": "var(--msk-token-keyword)",
    "token-parameter": "var(--msk-token-parameter)",
    "token-function": "var(--msk-token-function)",
    "token-string-expression": "var(--msk-token-string-expression)",
    "token-punctuation": "var(--msk-token-punctuation)",
    "token-link": "var(--msk-token-link)",
    "token-tag": "var(--msk-token-tag)",
    "token-tag-name": "var(--msk-token-tag-name)",
    "token-attr-name": "var(--msk-token-attr-name)",
    "token-attr-value": "var(--msk-token-attr-value)",
    "token-operator": "var(--msk-token-operator)",
    "token-builtin": "var(--msk-token-builtin)",
    "token-class-name": "var(--msk-token-class-name)"
  },
  fontStyle: true
})

export const BaseCodeBlock = ({
  childrenTop,
  childrenBottom,
  snippets,
}: CodeBlockProps) => {
  const hasTextLanguage = snippets.some((snippet) => snippet.language === "text");

  return (
    <CodeBlock
      childrenTop={childrenTop}
      childrenBottom={childrenBottom}
      snippets={snippets}
      theme={theme}
      components={{
        div: ({ children, ...rest }: { children: ReactNode }) => (
          <div
            className={cn(
              styles.content,
              "border border-brand-w1/30 py-2.5 font-mono text-f-p-mobile lg:text-f-p",
              hasTextLanguage && styles.text_language
            )}
            {...rest}
          >
            {children}
          </div>
        ),
        pre: ({ children, ...rest }: { children: ReactNode }) => (
          <pre 
            className={cn(
              styles.pre
            )} 
            {...rest}
          >
            {children}
          </pre>
        )
      }}
      // Only show line numbers if not a text file
      {...(!hasTextLanguage && {
        lineNumbers: {
          className: styles.line_indicator
        }
      })}
    />
  )
}