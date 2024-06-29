"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { topics } from "@/lib/constants";
import axios from "axios";
import React, { useState } from "react";
// @ts-ignore
import ReactHtmlParser from 'react-html-parser';

export type Topic = keyof typeof topics;

export default function Page() {
  const [selectedTopic, setSelectedTopic] =
    React.useState<Topic>("Astrophysics");

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
    topics[selectedTopic][0],
  ]);

  const [thresholdValue, setThresholdValue] = React.useState(5);

  const [interest, setInterest] = React.useState("");

  const [body, setBody] = React.useState("");
  const [isLoading, setIsLoading] = useState(false)

  const onValueChange = (value: Topic) => {
    setSelectedTopic(value);
    if (topics[value].length !== 0) {
      setSelectedCategories([topics[value][0]]);
    }
  };

  const handleThresholdValue = (val: number[]) => {
    setThresholdValue(val[0]);
  };

  const handleInterest = (val: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInterest(val.target.value);
  };

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL+"/papers",
        {
          topic: selectedTopic,
          categories: selectedCategories,
          threshold: thresholdValue,
          interest: "High interest",
        },
        { headers: { "Content-Type": "application/json" } }
      );

    console.log("body",res.data);
      setBody(res.data?.message);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  };
  return (
    <main className="flex flex-col items-center py-8 lg:py-16 gap-10">
      <section className="rounded-lg border shadow-lg max-w-2xl w-full px-6 py-4 flex flex-col gap-8">
        <div className="space-y-2">
          <Label>Topic</Label>
          <Select value={selectedTopic} onValueChange={onValueChange}>
            <SelectTrigger id="topic">
              <SelectValue placeholder="Select a Topic" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(topics).map((val) => {
                return (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {topics[selectedTopic].length !== 0 && (
          <div className="space-y-2">
            <Label>Categories</Label>
            <MultiSelect
              categories={topics[selectedTopic]}
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
          </div>
        )}
        <div className="space-y-2 mb-4">
          <Label>Threshold</Label>
          <Slider
            min={1}
            max={10}
            step={1}
            value={[thresholdValue]}
            onValueChange={handleThresholdValue}
          />
        </div>
        {/* <div className="space-y-2 mb-4">
          <Label>Interest</Label>
          <Textarea
            className="overflow-y-hidden resize-none"
            rows={8}
            value={interest}
            onChange={handleInterest}
          />
        </div> */}
        <Button disabled={isLoading} className="w-full" onClick={onSubmit}>
          Submit
        </Button>
      </section>
      <section className="px-8 py-4 border">{ReactHtmlParser(body)}</section>
    </main>
  );
}
