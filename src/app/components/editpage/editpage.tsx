'use client'
import { IconButton, Text } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"
import { Tabs, Tab, TabPanel } from "@yamada-ui/react"
import { AspectRatio } from "@yamada-ui/react"
import { Center } from "@yamada-ui/react"
import { FileButton } from "@yamada-ui/react"
import { GrAdd } from "react-icons/gr";
import { Card, CardHeader, CardBody } from "@yamada-ui/react"

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    } from "@yamada-ui/react"

type aslist = {
    width: number;
    height: number;
}

interface EditPageProps {
    cpage: number;
    ctitle: string;
    cimage: string;
    caspect: aslist;
    onAspectUpdate: (aspect: aslist) => void;
    onImageUpdate: (files: File[] | undefined) => void;
    onTitleUpdate: (title: string) => void;
}

export default function EditPage({ cpage, ctitle, cimage, caspect , onAspectUpdate, onImageUpdate ,onTitleUpdate }: EditPageProps) {
    console.log(cpage)

    return (
        <div>
            <Text>{ctitle}</Text>
            <Input value={ctitle} onChange={(e) => onTitleUpdate(e.target.value)} />
            <Tabs>
                <Tab>設定</Tab>
                <Tab>プレビュー</Tab>
                <TabPanel>
                    <Card>
                        <CardHeader>
                            <FileButton as={IconButton} icon={<GrAdd />} onChange={onImageUpdate}/>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-2 w-full" >
                                <div className="m-3">
                                    <img src={cimage} alt="preview" />
                                </div>
                                <div className="m-3">
                                    <Text>設定</Text>
                                    <Text>サイズ</Text>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel>
                    <Center>
                        <AspectRatio ratio={5 / 7} className="border m-8" w="full">
                            <img src={cimage} alt="preview" />
                        </AspectRatio>
                    </Center>
                </TabPanel>
            </Tabs>
        </div>
    )
}