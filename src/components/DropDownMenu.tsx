import React, { useContext } from "react";
import { PianoContext } from "../Context/PianoContext";

import { cn } from "../lib/utils";

import PianoEngine from "./piano/utils/PianoEngine";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";

export default function DropDownMenu({ menuOpen }: { menuOpen: boolean }) {
  const piano = useContext(PianoContext);

  const Piano = new PianoEngine();

  const chords = Piano.getChords();
  return (
    <div
      className={`flex justify-start items-start p-2 absolute w-[72.5vw] h-[30vh] bg-zinc-800 bg-opacity-85 top-[5rem] left-[13vw] transition-all duration-300 rounded-b-lg sm:overflow-hidden overflow-y-hidden overflow-x-scroll ${
        menuOpen
          ? "opacity-100 scale-95 translate-y-0 translate-x-0 blur-none"
          : "opacity-0 scale-[0.1] -translate-y-[50%] -translate-x-[40%] -z-50 blur-sm"
      }`}
    >
      <h3>Current Note: </h3>
      <p>{piano?.currentKey}</p>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {piano?.currentChord ?? "chords"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* <div className="w-[200%] h-full p-3 bg-white"> */}
              <ul className="flex flex-wrap justify-center h-fit w-[350px] px-4 py-2">
                {chords.map((chord, i) => (
                  <ListItem
                    key={i}
                    title={chord}
                    className=""
                    onClick={() => {
                      piano?.selectChord(chord);
                    }}
                  ></ListItem>
                ))}
              </ul>
              {/* </div> */}
              {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* 
        This is the current key component

        TODO: modularize
      */}
      {/* <div className="w-[33%] h-full p-4 flex flex-col justify-center items-center">
        <h3 className="text-white text-2xl bg-zinc-900 px-4 py-2 rounded-lg w-fit font-semibold border-2 border-white">
          current key:
        </h3>
        <p
          className={`w-max bg-zinc-900 bg-opacity-90 mt-2 rounded px-4 py-2 text-white text-6xl ${
            piano?.currentKey ? "font-semibold" : "font-normal"
          }`}
        >
          {piano?.currentKey ?? "N/A"}
        </p>
      </div> */}
      {/* 
        This is the chord selector component

        TODO: modularize
      */}
      {/* <div className="w-[33%] h-full p-4 flex flex-col justify-center items-center">
        <h3 className="text-white text-2xl bg-zinc-900 px-4 py-2 rounded-lg w-fit font-semibold border-2 border-white">
          Current Chord:
        </h3>
      </div> */}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
