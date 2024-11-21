'use client'
import { IconButton, Text } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"
import { Tabs, Tab, TabPanel } from "@yamada-ui/react"
import { AspectRatio } from "@yamada-ui/react"
import { FileButton } from "@yamada-ui/react"
import { GrAdd } from "react-icons/gr";
import { Card, CardHeader, CardBody } from "@yamada-ui/react"
import { useState } from "react"
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from "@yamada-ui/react"

interface EditPageProps {
    cpage: number;
    ctitle: string;
    cimage: string;
    onImageUpdate: (files: File[] | undefined) => void;
    onTitleUpdate: (title: string) => void;
}

type imageSize = {
    width: string;
    height: string;
}

export default function EditPage({ cpage, ctitle, cimage, onImageUpdate ,onTitleUpdate }: EditPageProps) {
    console.log(cpage)
    const [imageSize, setImageSize] = useState<imageSize[]>([{width: "100%", height: "100%"}]);
    
    const  handleWSizeUpdate = (width: string) => {
        const newAspectList = imageSize;
        newAspectList[0] = {width: width + "%", height: imageSize[0].height};
        setImageSize([...newAspectList]);
    };
    const  handleHSizeUpdate = (height: string) => {
        const newAspectList = imageSize;
        newAspectList[0] = {width: imageSize[0].width, height: height + "%"};
        setImageSize([...newAspectList]);
    };

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
                                    <Text>横:{imageSize[0].width}</Text>
                                    <Slider aria-label="slider-ex-1" defaultValue={100} min={1} max={100} onChangeEnd={(value) => handleWSizeUpdate(value.toString())}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Text>縦:{imageSize[0].height}</Text>
                                    <Slider aria-label="slider-ex-1" defaultValue={100} min={1} max={100} onChangeEnd={(value) => handleHSizeUpdate(value.toString())}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>

                                    
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel>
                            <AspectRatio ratio={5 / 7} className="border" w="full">
                                <img src={cimage} alt="preview" style={{width: imageSize[0].width, height: imageSize[0].height, objectPosition: "0% 0%"}} />
                            </AspectRatio>
                </TabPanel>
            </Tabs>
        </div>
    )
}