"use client"
import React from "react";
import ChatsHeader from "@/components/Headers/ChatsHeader";

function chatsPage() {
  return (
    <div>
      <ChatsHeader
        onAddNewChat={() => console.log("Nuevo chat")}
        onSearchClick={() => console.log("Buscar")}
        onFilterClick={() => console.log("Filtrar")}
        // rightExtras={<YourProfileAvatar />}
      />
    </div>
  );
}

export default chatsPage;
