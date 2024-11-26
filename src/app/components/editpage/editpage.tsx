'use client'
import { IconButton, Text } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"
import { Tabs, Tab, TabPanel } from "@yamada-ui/react"
import { FileButton } from "@yamada-ui/react"
import { GrAdd } from "react-icons/gr";
import { Card, CardHeader, CardBody } from "@yamada-ui/react"
import { ColorPicker } from "@yamada-ui/react"

import { Divider } from "@yamada-ui/react"
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from "@yamada-ui/react"
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
    ctextconfig: textConfigType;
    onTextUpdate: (text: string) => void;
    onTextSizeUpdate: (size: number) => void;
    onTextColorUpdate: (color: string) => void;
    onTextPositionUpdate: (x: number, y: number) => void;
    onTextFixPositionUpdate: (ver: string, hor: string) => void;
    onTextFontUpdate: (font: string) => void;

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

type textConfigType = {
    text: string;
    size: number;
    color: string;
    position: imagePositionType;
    fixtype: imageFixedType;
    font: string;
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



export default function EditPage({
        cpage, ctitle, cimage, csize, cglobalposition, cimagefixposition , cimagecrop, onImageCropUpdate, onImageFixPositionUpdate, onImageGlobalXPositionUpdate, onImageGlobalYPositionUpdate, onImageWSizeUpdate,onImageUpdate ,onTitleUpdate,
        ctextconfig, onTextUpdate, onTextSizeUpdate, onTextColorUpdate, onTextPositionUpdate, onTextFixPositionUpdate, onTextFontUpdate
    }: EditPageProps) {
    console.log(cpage)
    
    return (
        <div>
            <Text>{ctitle}</Text>
            <Input value={ctitle} onChange={(e) => onTitleUpdate(e.target.value)} />
            <Tabs>
                <Tab>画像</Tab>
                <Tab>テキスト</Tab>
                <Tab>プレビュー</Tab>
                <TabPanel>
                <FileButton as={IconButton} icon={<GrAdd />} onChange={onImageUpdate}/>
                <Divider className="m-2"/>

                    <Card>

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
                                        <Radio value="3" >下</Radio>
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
                    <Input value={ctextconfig.text} onChange={(e) => onTextUpdate(e.target.value)} />
                    <Text>サイズ:{ctextconfig.size}</Text>
                    <Slider aria-label="slider-ex-1" value={ctextconfig.size} min={1} max={100} onChange={(value) => onTextSizeUpdate(value)}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <ColorPicker color={ctextconfig.color} onChange={(color) => onTextColorUpdate(color)} />
                </TabPanel>
                <TabPanel>
                    <div className="border relative overflow-hidden aspect-[5/7]" >

                        <img 
                        src={cimage} 
                        className={"absolute object-fill "}
                        alt="preview" 
                        style={{width: csize.width +"%", height: "auto", top: cglobalposition.y + "%", left: cglobalposition.x + "%", clipPath: "inset(" + cimagecrop.top + "% " + (100-cimagecrop.right) + "% " + (100-cimagecrop.bottom) + "% " + cimagecrop.left + "%)", 
                            transform: "translate(" +  
                            (
                                cimagefixposition.hor === "1" ? ((-cimagecrop.left)) :
                                cimagefixposition.hor === "3" ? -((100 - (100 - cimagecrop.right))) :
                                cimagefixposition.hor === "2" ? (-50 + (-cimagecrop.left / 2) + ((100 - cimagecrop.right) / 2)) :
                                "0"
                                
                            ) + "%, " + 
                            (
                                cimagefixposition.ver === "1" ? ((-cimagecrop.top)) :
                                cimagefixposition.ver === "3" ? -((100 - (100 - cimagecrop.bottom))) :
                                cimagefixposition.ver === "2" ? (-50 + (-cimagecrop.top / 2) + ((100 - cimagecrop.bottom) / 2)) :
                                "0"
                            ) + "%)"
                        }}
                        
                        />

                        <p className="absolute text-[#000] text-2xl" style={{top: ctextconfig.position.y + "%", left: ctextconfig.position.x + "%", fontSize: ctextconfig.size + "px", color: ctextconfig.color, fontFamily: ctextconfig.font}}>
                            {ctextconfig.text}
                        </p>
                    </div>
        </TabPanel>
            </Tabs>
        </div>
    )
}