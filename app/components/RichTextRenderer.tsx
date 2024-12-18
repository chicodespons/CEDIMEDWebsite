/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface RichTextRendererProps {
  content: Array<any>; // Adjust the type as needed for your content structure
  
}

const RichTextRenderer = ({ content }: RichTextRendererProps) => {
    const renderNode = (node: any, index: number) => {
      switch (node.type) {
        case 'heading':
            const headingLevel: number = node.level || 1;
            const HeadingTag = `h${headingLevel +1}` as keyof JSX.IntrinsicElements;

            // Define the Tailwind classes for different heading levels
            const headingClasses: Record<number,string> = {
                   1: "text-2xl text-left font-bold tracking-wider uppercase border-l-4 border-uzGreen px-2 mt-16",
          2: "text-xl text-left font-bold tracking-wider uppercase border-l-4 border-uzGreen px-2 mt-16",
          3: "text-lg text-left font-bold tracking-wider uppercase border-l-4 border-uzGreen px-2 mt-16",
                // Add more heading levels if needed
            };

            return (
             <HeadingTag key={index} className={headingClasses[headingLevel]}>
                {node.children.map((child: any, idx: number) => renderNode(child, idx))}
             </HeadingTag>
            );
  
        case 'paragraph':
          return (
            <p key={index} className="text-lg mb-16 mt-16 leading-loose max-w-full">
              {node.children.map((child: any, idx: number) => renderNode(child, idx))}
            </p>
          );
  
        case 'text':
          let textClasses = '';
          if (node.bold) textClasses += 'font-bold ';
          if (node.italic) textClasses += 'italic ';
          if (node.underline) textClasses += 'underline ';
          if (node.strikethrough) textClasses += 'line-through ';
          if (node.code) textClasses += 'bg-gray-200 font-mono px-2 ';
  
          return (
            <span key={index} className={textClasses} style={{ wordWrap: 'break-word' }}>
              {node.text}
            </span>
          );
  
        case 'link':
          return (
            <a
              key={index}
              href={node.url}
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {node.children.map((child: any, idx: number) => renderNode(child, idx))}
            </a>
          );
  
        case 'image':
          return (
            <div key={index} className="my-8 max-w-full">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${node.image.formats.medium.url}`}
                alt={node.image.alternativeText || 'Image'}
                width={node.image.formats.medium.width || 800}
                height={node.image.formats.medium.height || 600}
                className="rounded-md max-w-full"
              />
              {node.image.caption && <p className="text-sm text-gray-500 mt-2">{node.image.caption}</p>}
            </div>
          );
  
        case 'list':
          const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag key={index} className="text-lg list-disc m-6 leading-loose max-w-full">
              {node.children.map((child: any, idx: number) => renderNode(child, idx))}
            </ListTag>
          );
  
        case 'list-item':
          return <li key={index} className="mb-6 text-lg leading-loose max-w-full">{node.children.map((child: any, idx: number) => renderNode(child, idx))}</li>;
  
          case 'quote':
            return (
              <blockquote
                key={index}
                className="block border-l-4 border-gray-300 pl-4 mb-8 mx-auto leading-loose text-lg"
                style={{ wordWrap: 'break-word' }} // Prevent text overflow
              >
                {node.children.map((child: any, idx: number) => renderNode(child, idx))}
              </blockquote>
            );
  
        default:
          return null;
      }
    };
  
    return <div className="max-w-full leading-loose text-lg">{content.map((node, index) => renderNode(node, index))}</div>;
  };

export default RichTextRenderer;
