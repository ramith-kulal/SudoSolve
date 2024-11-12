import React from 'react';

interface ButtonProps {
  title: string;
  link: string;
}

export default function Button({ title, link }: ButtonProps) {
  return (
    <div className="wrapper">
      <a className="btn" href={link}>
        <span>{title}</span>
      </a>
    </div>
  );
}
