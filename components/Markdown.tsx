// Basic imports
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

// Types
import type { FC } from "react"

interface MarkdownProps {
  content: string
  className: string
}

const Markdown: FC<MarkdownProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      className={`${className} w-full mt-5 rounded-md text-xl tracking-wide break-words leading-relaxed transition-all`}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-4xl font-semibold mt-10 mb-10" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-3xl font-semibold mt-10 mb-10" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-2xl font-semibold mt-10 mb-10" />
        ),
        h4: ({ node, ...props }) => (
          <h3 {...props} className="text-xl font-semibold mt-10 mb-10" />
        ),
        p: ({ node, ...props }) => <p {...props} className="mt-5 mb-5" />,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <div className="mt-6">
              <SyntaxHighlighter
                {...props}
                language={match[1]}
                style={atomDark}
                showLineNumbers={true}
                wrapLines={true}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className="text-lg break-words bg-secondary p-1 rounded-sm">
              {children}
            </code>
          )
        },
        blockquote: ({ node, ...props }) => (
          <div className="mt-10 mb-10 bg-opacity-50 bg-secondary px-2 border-l-4 border-white text-white py-px flex relative text-lg">
            <blockquote {...props} className="mt-2" />
          </div>
        ),
        img: ({ node, ...props }) => {
          return (
            <>
              <span className="block relative w-full h-96 rounded-md mt-5 mb-5">
                <Image
                  src={props?.src || ""}
                  alt={props?.alt || ""}
                  layout="fill"
                  objectPosition="center"
                  objectFit="contain"
                />
              </span>
            </>
          )
        },
        a: ({ node, ...props }) => {
          return (
            <a
              {...props}
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown
