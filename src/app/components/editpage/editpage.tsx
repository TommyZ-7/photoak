'use client'
import { useState } from "react"
import { Text } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"


interface EditPageProps {
    cpage: number;
    ctitle: string;
    onTitleUpdate: (title: string) => void;
}

export default function EditPage({ cpage, ctitle, onTitleUpdate }: EditPageProps) {
    return (
        <div>
            <h1>Edit Page</h1>
            <Text>{ctitle}</Text>
            <Input value={ctitle} onChange={(e) => onTitleUpdate(e.target.value)} />
        </div>
    )
}