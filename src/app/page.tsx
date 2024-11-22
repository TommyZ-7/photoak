"use client"
import { Card, CardHeader, CardBody } from "@yamada-ui/react"
import { Reorder, ReorderItem, ReorderTrigger } from "@yamada-ui/react"
import { HStack } from "@yamada-ui/react"
import { Button } from "@yamada-ui/react"
import { ScrollArea } from "@yamada-ui/react"


import { useState } from "react"
import EditPage from "@/app/components/editpage/editpage"


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

export default function Home() {
  const [list, setList] = useState<string[]>(["タイトル"]);
  const [loopTime, setLoopTime] = useState([0]);
  const [pageSelected, setPageSelected] = useState(0);
  const [imageList, setImageList] = useState<string[]>([]);
  const [ imageSize, setImageSize ] = useState<imageSizeType[]>([{width: 100, height: 100}]);
  const [ imagePosition, setImagePosition ] = useState<imagePositionType[]>([{x: 0, y : 0}]);
  const [ imageGlobalPosition, setImageGlobalPosition ] = useState<imageGlobalPositionType[]>([{x: 50, y: 50}]);
  const [ imageFixed, setImageFixed ] = useState<imageFixedType[]>([{ver: "2", hor: "2"}]);

  const handleTitleUpdate = (title: string) => {
    const newList = list;
    newList[pageSelected] = title;
    setList([...newList]);
  }



  const handleChangeFile = (files: File[] | undefined) => {
    if (files && files[0]) {
      const newImageList = imageList;
      newImageList[pageSelected] = window.URL.createObjectURL(files[0]);
      setImageList([...newImageList]);
    }
  };

  const handleWSizeUpdate = (width: number) => {
    const newAspectList = imageSize;
    newAspectList[pageSelected] = {width: width , height: imageSize[pageSelected].height};
    setImageSize([...newAspectList]);
  };
  const handleHSizeUpdate = (height: number) => {
    const newAspectList = imageSize;
    newAspectList[pageSelected] = {width: imageSize[pageSelected].width, height: height };
    setImageSize([...newAspectList]);
  };

  const handleXPositionUpdate = (x: number) => {
    const newPositionList = imagePosition;
    newPositionList[pageSelected] = {x: x , y: imagePosition[pageSelected].y};
    setImagePosition([...newPositionList]);
  }

  const handleYPositionUpdate = (y: number) => {
    const newPositionList = imagePosition;
    newPositionList[pageSelected] = {x: imagePosition[pageSelected].x, y: y };
    setImagePosition([...newPositionList]);
  }

  const handleGlobalXPositionUpdate = (x: number) => {
    const newPositionList = imageGlobalPosition;
    newPositionList[pageSelected] = {x: x , y: imageGlobalPosition[pageSelected].y};
    setImageGlobalPosition([...newPositionList]);
  }

  const handleGlobalYPositionUpdate = (y: number) => {
    const newPositionList = imageGlobalPosition;
    newPositionList[pageSelected] = {x: imageGlobalPosition[pageSelected].x, y: y };
    setImageGlobalPosition([...newPositionList]);
  }

  const handleImageFixed = (ver: string, hor: string) => {
    const newImageFixed = imageFixed;
    newImageFixed[pageSelected] = {ver: ver, hor: hor};
    setImageFixed([...newImageFixed]);
  }



  return (
      <main>
        <div className="grig grid grid-cols-5">
          <Card className="col-span-1 m-2 h-screen">
            <ScrollArea className="h-full"  type="scroll">
          <CardHeader>
            <Button colorScheme="primary" onClick={() => {
              setLoopTime([...loopTime, loopTime.length]);
              setList([...list, "ページ" + list.length]);
              setImageSize([...imageSize, {width: 100, height: 100}]);
              setImagePosition([...imagePosition, {x: 0, y: 0}]);
              setImageGlobalPosition([...imageGlobalPosition, {x: 50, y: 50}]);
              setImageFixed([...imageFixed, {ver: "2", hor: "2"}]);
              }}>+</Button>
          </CardHeader>
          <CardBody>
          <Reorder size="sm" variant="elevated" onCompleteChange={(values: number[]) => setLoopTime(values)}>
            {loopTime.map(( value ) => (
              <ReorderItem key={value} value={value}>
                  <HStack>
                  <ReorderTrigger />
                  
                    <Button w="full" variant="ghost" onClick={() => setPageSelected(value)}>{list[value]}</Button>
                  </HStack>
              </ReorderItem>
            ))}
          </Reorder>
          </CardBody>
          </ScrollArea>
          </Card>
          <div className="col-span-4 m-2">
            <EditPage 
            cpage={pageSelected} ctitle={list[pageSelected]} cimage={imageList[pageSelected]} csize={imageSize[pageSelected]} cposition={imagePosition[pageSelected]} cglobalposition={imageGlobalPosition[pageSelected]}
            cimagefixposition={imageFixed[pageSelected]}
            onImageXPositionUpdate={handleXPositionUpdate} onImageYPositionUpdate={handleYPositionUpdate} 
            onImageWSizeUpdate={handleWSizeUpdate} onImageHSizeUpdate={handleHSizeUpdate} 
            onImageUpdate={handleChangeFile} onTitleUpdate={handleTitleUpdate}
            onImageGlobalXPositionUpdate={handleGlobalXPositionUpdate} onImageGlobalYPositionUpdate={handleGlobalYPositionUpdate}
            onImageFixPositionUpdate={handleImageFixed}
            />
          </div>
        </div>
      </main>
  );
}
