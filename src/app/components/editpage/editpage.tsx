'use client'
import { useState } from "react"
import { IconButton, Text } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"
import { Tabs, Tab, TabPanel } from "@yamada-ui/react"
import { FileButton } from "@yamada-ui/react"
import { GrAdd } from "react-icons/gr";
import { Card, CardHeader, CardBody } from "@yamada-ui/react"
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from "@yamada-ui/react"
  import { Checkbox } from "@yamada-ui/react"
  import { Radio, RadioGroup } from "@yamada-ui/react"
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderStartThumb,
    RangeSliderEndThumb,
    RangeSliderMark,
} from "@yamada-ui/react"


interface EditPageProps {
    cpage: number;
    ctitle: string;
    cimage: string;
    csize: imageSizeType;
    cposition: imagePositionType;
    cglobalposition: imageGlobalPositionType;
    cimagefixposition: imageFixedType;
    cimagecrop: imagecropType;
    onImageCropUpdate: (top: number, bottom: number, left: number, right: number) => void;
    onImageFixPositionUpdate: (ver: string, hor: string) => void;
    onImageGlobalXPositionUpdate: (x: number) => void;
    onImageGlobalYPositionUpdate: (y: number) => void;
    onImageXPositionUpdate: (x: number) => void;
    onImageYPositionUpdate: (y: number) => void;
    onImageWSizeUpdate: (width: number) => void;
    onImageHSizeUpdate: (height: number) => void;
    onImageUpdate: (files: File[] | undefined) => void;
    onTitleUpdate: (title: string) => void;
}

type imageSizeType = {
    width: number;
    height: number;
}

type imagePositionType = {
    x: number;
    y: number;
}

type imageGlobalPositionType = {
    x: number;
    y: number;
}

type imageFixedType = {
    ver: string;
    hor: string;
}

type imagecropType = {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

type test = {
    width: number;
    height: number;
    ver: number;
    hor: number;
}



export default function EditPage({ cpage, ctitle, cimage, csize, cglobalposition, cimagefixposition , cimagecrop, onImageCropUpdate, onImageFixPositionUpdate, onImageGlobalXPositionUpdate, onImageGlobalYPositionUpdate, onImageWSizeUpdate,onImageUpdate ,onTitleUpdate }: EditPageProps) {
    console.log(cpage)
    const [test, setTest] = useState<test>({width: 100, height: 100, ver: 50, hor: 50})
    return (
        <div>
            <Text>{ctitle}</Text>
            <Input value={ctitle} onChange={(e) => onTitleUpdate(e.target.value)} />
            <Tabs>
                <Tab>画像</Tab>
                <Tab>テキスト</Tab>
                <Tab>プレビュー</Tab>
                <TabPanel>
                    <Card>
                        <CardHeader>
                            <FileButton as={IconButton} icon={<GrAdd />} onChange={onImageUpdate}/>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-2 w-full" >
                                <div className="m-3 relative">
                                    <img src={cimage} alt="preview" 
                                    className="absolute blur"
                                    />
                                    <img src={cimage} alt="preview" 
                                    style={{ clipPath: "inset(" + cimagecrop.top + "% " + (100-cimagecrop.right) + "% " + (100-cimagecrop.bottom) + "% " + cimagecrop.left + "%)"} }
                                    className=""
                                    />
                                </div>
                                <div className="m-3">
                                    <Text>設定</Text>
                                    <Text>サイズ:{csize.width}</Text>
                                    <Slider aria-label="slider-ex-1" value={csize.width} min={1} max={200} onChange={(value) => onImageWSizeUpdate(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Text>横:{cglobalposition.x}</Text>
                                    <Slider aria-label="slider-ex-1" value={cglobalposition.x} min={0} max={100} onChange={(value) => onImageGlobalXPositionUpdate(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Text>縦:{cglobalposition.y}</Text>
                                    <Slider aria-label="slider-ex-1" value={cglobalposition.y} min={0} max={100} onChange={(value) => onImageGlobalYPositionUpdate(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Text>中央位置</Text>
                                    <RadioGroup direction="row" value={cimagefixposition.hor} onChange={(value) => onImageFixPositionUpdate(cimagefixposition.ver, value)}>
                                        <Radio value="1">左</Radio>
                                        <Radio value="2">中</Radio>
                                        <Radio value="3">右</Radio>
                                    </RadioGroup>
                                    <RadioGroup direction="row" value={cimagefixposition.ver} onChange={(value) => onImageFixPositionUpdate(value , cimagefixposition.hor)}>
                                        <Radio value="1">上</Radio>
                                        <Radio value="2">中</Radio>
                                        <Radio value="3">下</Radio>
                                    </RadioGroup>
                                    <Text>トリミング</Text>
                                    <RangeSlider min={0} max={100} step={1} value={[cimagecrop.top, cimagecrop.bottom]} onChange={(value) => onImageCropUpdate(value[0], value[1], cimagecrop.left, cimagecrop.right)}>
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack />
                                        </RangeSliderTrack>
                                        <RangeSliderStartThumb />
                                        <RangeSliderEndThumb />
                                        <RangeSliderMark value={cimagecrop.top} />
                                        <RangeSliderMark value={cimagecrop.bottom} />
                                    </RangeSlider>
                                    <RangeSlider min={0} max={100} step={1} value={[cimagecrop.left, cimagecrop.right]} onChange={(value) => onImageCropUpdate(cimagecrop.top, cimagecrop.bottom, value[0], value[1])}>
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack />
                                        </RangeSliderTrack>
                                        <RangeSliderStartThumb />
                                        <RangeSliderEndThumb />
                                        <RangeSliderMark value={cimagecrop.left} />
                                        <RangeSliderMark value={cimagecrop.right} />
                                    </RangeSlider>



                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel>
                    <Text>テキスト</Text>
                </TabPanel>
                <TabPanel>
                    <div className="border relative overflow-hidden aspect-[5/7]" >
                        <img 
                        src={cimage} 
                        className={"absolute object-fill " + (cimagefixposition.hor == "1" ? "" : cimagefixposition.hor == "2" ? "-translate-x-1/2" : "-translate-x-full") + " " + (cimagefixposition.ver == "1" ? "" : cimagefixposition.ver == "2" ? "-translate-y-1/2" : "-translate-y-full")}
                        alt="preview" 
                        style={{width: csize.width +"%", height: "auto", top: cglobalposition.y + "%", left: cglobalposition.x + "%", clipPath: "inset(" + cimagecrop.top + "% " + (100-cimagecrop.right) + "% " + (100-cimagecrop.bottom) + "% " + cimagecrop.left + "%)"}}
                        />
                    </div>
        </TabPanel>
            </Tabs>
        </div>
    )
}