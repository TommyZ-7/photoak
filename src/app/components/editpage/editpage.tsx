"use client";
import { Button, IconButton, Text } from "@yamada-ui/react";
import { Input } from "@yamada-ui/react";
import { Tabs, Tab, TabPanel } from "@yamada-ui/react";
import { FileButton } from "@yamada-ui/react";
import { GrAdd } from "react-icons/gr";
import { Card, CardBody } from "@yamada-ui/react";
import { ColorPicker } from "@yamada-ui/react";
import { useMeasure } from "react-use";

import { Divider } from "@yamada-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@yamada-ui/react";
import { Radio, RadioGroup } from "@yamada-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderStartThumb,
  RangeSliderEndThumb,
  RangeSliderMark,
} from "@yamada-ui/react";

import { Select, Option, OptionGroup } from "@yamada-ui/react";

import { Accordion, AccordionItem } from "@yamada-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@yamada-ui/react";

import {
  Rampart_One,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Shippori_Mincho,
  Potta_One,
  Kaisei_Decol,
  Yuji_Mai,
  Klee_One,
  Zen_Kurenaido,
  Reggae_One,
  Sawarabi_Mincho,
  Lora,
  Cinzel,
  Poiret_One,
  Dancing_Script,
  Allura,
} from "next/font/google";

const RampartOneFont = Rampart_One({
  weight: "400",
  subsets: ["latin"],
});

const NotoSansJPFont = Noto_Sans_JP({
  weight: "400",
  subsets: ["latin"],
});

const NotoSerifJPFont = Noto_Serif_JP({
  weight: "400",
  subsets: ["latin"],
});

const ShipporiMinchoFont = Shippori_Mincho({
  weight: "400",
  subsets: ["latin"],
});

const PottaOneFont = Potta_One({
  weight: "400",
  subsets: ["latin"],
});

const KaiseiDecolFont = Kaisei_Decol({
  weight: "400",
  subsets: ["latin"],
});

const YujiMaiFont = Yuji_Mai({
  weight: "400",
  subsets: ["latin"],
});

const KleeOneFont = Klee_One({
  weight: "400",
  subsets: ["latin"],
});

const ZenKurenaidoFont = Zen_Kurenaido({
  weight: "400",
  subsets: ["latin"],
});

const ReggaeOneFont = Reggae_One({
  weight: "400",
  subsets: ["latin"],
});

const SawarabiMinchoFont = Sawarabi_Mincho({
  weight: "400",
  subsets: ["latin"],
});

const LoraFont = Lora({
  weight: "400",
  subsets: ["latin"],
});

const CinzelFont = Cinzel({
  weight: "400",
  subsets: ["latin"],
});

const PoiretOneFont = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const DancingScriptFont = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

const AlluraFont = Allura({
  weight: "400",
  subsets: ["latin"],
});

const fonts = [
  RampartOneFont,
  NotoSansJPFont,
  NotoSerifJPFont,
  ShipporiMinchoFont,
  PottaOneFont,
  KaiseiDecolFont,
  YujiMaiFont,
  KleeOneFont,
  ZenKurenaidoFont,
  ReggaeOneFont,
  SawarabiMinchoFont,
  LoraFont,
  CinzelFont,
  PoiretOneFont,
  DancingScriptFont,
  AlluraFont,
];
const fontNames = [
  "Rampart One",
  "Noto Sans JP",
  "Noto Serif JP",
  "Shippori Mincho",
  "Potta One",
  "Kaisei Decol",
  "Yuji Mai",
  "Klee One",
  "Zen Kurenaido",
  "Reggae One",
  "Sawarabi Mincho",
  "Lora",
  "Cinzel",
  "Poiret One",
  "Dancing Script",
  "Allura",
];

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

  onImageCropUpdate: (
    top: number,
    bottom: number,
    left: number,
    right: number
  ) => void;
  onImageFixPositionUpdate: (ver: string, hor: string) => void;
  onImageGlobalXPositionUpdate: (x: number) => void;
  onImageGlobalYPositionUpdate: (y: number) => void;
  onImageXPositionUpdate: (x: number) => void;
  onImageYPositionUpdate: (y: number) => void;
  onImageWSizeUpdate: (width: number) => void;
  onImageHSizeUpdate: (height: number) => void;
  onImageUpdate: (files: File[] | undefined) => void;
  onTitleUpdate: (title: string) => void;
  onFontStyleUpdate: (fontStyle: string) => void;
}

type imageSizeType = {
  width: number;
  height: number;
};

type textConfigType = {
  text: string;
  size: number;
  color: string;
  position: imagePositionType;
  fixtype: imageFixedType;
  font: string;
  fontStyle: string;
};

type imagePositionType = {
  x: number;
  y: number;
};

type imageGlobalPositionType = {
  x: number;
  y: number;
};

type imageFixedType = {
  ver: string;
  hor: string;
};

type imagecropType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export default function EditPage({
  cpage,
  ctitle,
  cimage,
  csize,
  cglobalposition,
  cimagefixposition,
  cimagecrop,
  onImageCropUpdate,
  onImageFixPositionUpdate,
  onImageGlobalXPositionUpdate,
  onImageGlobalYPositionUpdate,
  onImageWSizeUpdate,
  onImageUpdate,
  onTitleUpdate,
  ctextconfig,
  onTextUpdate,
  onTextSizeUpdate,
  onTextColorUpdate,
  onTextPositionUpdate,
  onTextFixPositionUpdate,
  onTextFontUpdate,
  onFontStyleUpdate,
}: EditPageProps) {
  console.log(cpage);

  const [ref, { width }] = useMeasure();

  const handleTest = () => {
    console.log(ctextconfig.size * (width / 100) + "px");
  };

  return (
    <div>
      <Text>{ctitle}</Text>
      <Button onClick={handleTest}>test</Button>
      <Input value={ctitle} onChange={(e) => onTitleUpdate(e.target.value)} />
      <Tabs>
        <Tab>画像</Tab>
        <Tab>テキスト</Tab>
        <Tab>プレビュー</Tab>
        <TabPanel>
          <FileButton
            as={IconButton}
            icon={<GrAdd />}
            onChange={onImageUpdate}
          />
          <Divider className="m-2" />

          <Card>
            <CardBody>
              <div className="grid grid-cols-2 w-full">
                <div className="m-3 relative">
                  <img src={cimage} alt="preview" className="absolute blur" />
                  <img
                    src={cimage}
                    alt="preview"
                    style={{
                      clipPath:
                        "inset(" +
                        cimagecrop.top +
                        "% " +
                        (100 - cimagecrop.right) +
                        "% " +
                        (100 - cimagecrop.bottom) +
                        "% " +
                        cimagecrop.left +
                        "%)",
                    }}
                    className=""
                  />
                </div>
                <div className="m-3">
                  <Accordion isMultiple>
                    <AccordionItem label="サイズ">
                      <Text>サイズ:{csize.width}</Text>
                      <Slider
                        aria-label="slider-ex-1"
                        value={csize.width}
                        min={1}
                        max={200}
                        onChange={(value) => onImageWSizeUpdate(value)}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </AccordionItem>
                    <AccordionItem label="位置">
                      <Text>横:{cglobalposition.x}</Text>
                      <Slider
                        aria-label="slider-ex-1"
                        value={cglobalposition.x}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          onImageGlobalXPositionUpdate(value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text>縦:{cglobalposition.y}</Text>
                      <Slider
                        aria-label="slider-ex-1"
                        value={cglobalposition.y}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          onImageGlobalYPositionUpdate(value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text>中央位置</Text>
                      <RadioGroup
                        direction="row"
                        value={cimagefixposition.hor}
                        onChange={(value) =>
                          onImageFixPositionUpdate(cimagefixposition.ver, value)
                        }
                      >
                        <Radio value="1">左</Radio>
                        <Radio value="2">中</Radio>
                        <Radio value="3">右</Radio>
                      </RadioGroup>
                      <RadioGroup
                        direction="row"
                        value={cimagefixposition.ver}
                        onChange={(value) =>
                          onImageFixPositionUpdate(value, cimagefixposition.hor)
                        }
                      >
                        <Radio value="1">上</Radio>
                        <Radio value="2">中</Radio>
                        <Radio value="3">下</Radio>
                      </RadioGroup>
                    </AccordionItem>
                    <AccordionItem label="クロップ">
                      <br />
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertTitle></AlertTitle>
                        <AlertDescription>
                          クロップを使用すると環境によって表示がずれる可能性があります。
                        </AlertDescription>
                      </Alert>
                      <Text>トリミング</Text>
                      <RangeSlider
                        min={0}
                        max={100}
                        step={1}
                        value={[cimagecrop.top, cimagecrop.bottom]}
                        onChange={(value) =>
                          onImageCropUpdate(
                            value[0],
                            value[1],
                            cimagecrop.left,
                            cimagecrop.right
                          )
                        }
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderStartThumb />
                        <RangeSliderEndThumb />
                        <RangeSliderMark value={cimagecrop.top} />
                        <RangeSliderMark value={cimagecrop.bottom} />
                      </RangeSlider>
                      <RangeSlider
                        min={0}
                        max={100}
                        step={1}
                        value={[cimagecrop.left, cimagecrop.right]}
                        onChange={(value) =>
                          onImageCropUpdate(
                            cimagecrop.top,
                            cimagecrop.bottom,
                            value[0],
                            value[1]
                          )
                        }
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderStartThumb />
                        <RangeSliderEndThumb />
                        <RangeSliderMark value={cimagecrop.left} />
                        <RangeSliderMark value={cimagecrop.right} />
                      </RangeSlider>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel>
          <Card>
            <CardBody>
              <Input
                value={ctextconfig.text}
                onChange={(e) => onTextUpdate(e.target.value)}
              />
              <Text>サイズ:{ctextconfig.size}</Text>
              <Slider
                aria-label="slider-ex-1"
                value={ctextconfig.size}
                min={1}
                max={100}
                onChange={(value) => onTextSizeUpdate(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <ColorPicker
                color={ctextconfig.color}
                onChange={(color) => onTextColorUpdate(color)}
              />
              <Text>フォント</Text>
              <Select
                className={ctextconfig.font}
                placeholder="標準"
                onChange={(value) => onTextFontUpdate(value)}
              >
                {fonts.map((font, index) => (
                  <Option
                    key={index}
                    value={font.className}
                    className={font.className}
                  >
                    {fontNames[index]}
                  </Option>
                ))}
              </Select>
              <Text>フォントスタイル</Text>
              <RadioGroup
                direction="row"
                value={ctextconfig.fontStyle}
                onChange={(value) => onFontStyleUpdate(value)}
              >
                <Radio value="normal">標準</Radio>
                <Radio value="italic">斜体</Radio>
                <Radio value="oblique">傾斜</Radio>
              </RadioGroup>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel>
          <div
            ref={ref as React.LegacyRef<HTMLDivElement>}
            className="border relative overflow-hidden aspect-[5/7]"
          >
            <img
              src={cimage}
              className={"absolute object-fill max-w-none"}
              alt="preview"
              style={{
                width: csize.width + "%",
                height: "auto",
                top: cglobalposition.y + "%",
                left: cglobalposition.x + "%",
                clipPath:
                  "inset(" +
                  cimagecrop.top +
                  "% " +
                  (100 - cimagecrop.right) +
                  "% " +
                  (100 - cimagecrop.bottom) +
                  "% " +
                  cimagecrop.left +
                  "%)",
                transform:
                  "translate(" +
                  (cimagefixposition.hor === "1"
                    ? -cimagecrop.left
                    : cimagefixposition.hor === "3"
                    ? -(100 - (100 - cimagecrop.right))
                    : cimagefixposition.hor === "2"
                    ? -50 + -cimagecrop.left / 2 + (100 - cimagecrop.right) / 2
                    : "0") +
                  "%, " +
                  (cimagefixposition.ver === "1"
                    ? -cimagecrop.top
                    : cimagefixposition.ver === "3"
                    ? -(100 - (100 - cimagecrop.bottom))
                    : cimagefixposition.ver === "2"
                    ? -50 + -cimagecrop.top / 2 + (100 - cimagecrop.bottom) / 2
                    : "0") +
                  "%)",
              }}
            />
            <p
              className={ctextconfig.font + " absolute text-[#000]"}
              style={{
                top: ctextconfig.position.y + "%",
                left: ctextconfig.position.x + "%",
                fontSize: (ctextconfig.size * (width / 100)) / 5 + "px",
                color: ctextconfig.color,
                fontStyle: ctextconfig.fontStyle,
              }}
            >
              {ctextconfig.text}
            </p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
