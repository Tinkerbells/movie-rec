"use client";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { GenreMultiSelect } from "./GenreMultiSelect";
export const RecommendationMenu = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Tabs defaultValue="query" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="query">Genre</TabsTrigger>
        <TabsTrigger value="similar">Similarity</TabsTrigger>
      </TabsList>
      <TabsContent value="query">
        <Card>
          <CardHeader>
            <CardTitle>Query recommendation</CardTitle>
            <CardDescription>
              Get recommendation using genre and little query
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <GenreMultiSelect />
            <div className="grid w-full max-w-lg items-center gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email-2">Write specifications here.</Label>
                <Textarea />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="similar"></TabsContent>
    </Tabs>
  );
};
