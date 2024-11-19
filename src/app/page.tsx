"use client"
import { Card, CardHeader, CardBody } from "@yamada-ui/react"
import { Text } from "@yamada-ui/react"
import { Reorder, ReorderItem, ReorderTrigger } from "@yamada-ui/react"
import { HStack } from "@yamada-ui/react"
import { Button } from "@yamada-ui/react"
import { Input } from "@yamada-ui/react"

import { useState } from "react"
import EditPage from "@/app/components/editpage/editpage"

export default function Home() {
  const [list, setList] = useState<string[]>(["タイトル"]);
  const [loopTime, setLoopTime] = useState([0]);
  const [pageSelected, setPageSelected] = useState(0);

  const handleClick = () => {
    console.log(list);
    console.log(loopTime);
    console.log(pageSelected);
  }

  const handleTitleUpdate = (title: string) => {
    const newList = list;
    newList[pageSelected] = title;
    setList([...newList]);
  }

  return (
      <main>
        <div className="grig grid grid-cols-5">
          <Card className="col-span-1 m-2">
          <CardHeader>
            <Button colorScheme="primary" onClick={() => {
              setLoopTime([...loopTime, loopTime.length]);
              setList([...list, "ページ" + list.length]);
              
              }}>+</Button>
          </CardHeader>
          <CardBody>
          <Reorder size="sm" variant="elevated" onCompleteChange={(values: number[]) => setLoopTime(values)}>
            {loopTime.map(( value, index) => (
              <ReorderItem key={value} value={value}>
                  <HStack>
                  <ReorderTrigger />
                  
                    <Button w="full" variant="ghost" onClick={() => setPageSelected(value)}>{list[value]}</Button>
                  </HStack>
              </ReorderItem>
            ))}
          </Reorder>
          </CardBody>
          </Card>
          <div className="col-span-4 m-2">
            <EditPage cpage={pageSelected} ctitle={list[pageSelected]} onTitleUpdate={handleTitleUpdate}/>
          </div>
        </div>
      </main>
  );
}
