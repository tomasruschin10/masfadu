import React from "react";
import { Box, Divider, ScrollView, Text } from "native-base";
import { TouchableOpacity } from "react-native";

function RecommendedTags({
  searchText,
  FilterTags,
  form,
  Concat,
  setSearchText,
}) {
  return (
    <Box mx="5" style={{ position: "relative" }}>
      <Box
        style={{
          maxHeight: 130,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 1,
          zIndex: 100,
          backgroundColor: "white",
          elevation: 5,
          shadowColor: "rgba(48,110,237,1)",
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
          {searchText !== "" &&
            FilterTags().map((it: any): any => {
              let repeat = form.tags.filter((item) => item.name === it.name);
              if (repeat.length === 0) {
                return (
                  <Box key={it.id}>
                    <TouchableOpacity
                      onPress={() => {
                        Concat(it);
                        setSearchText("");
                      }}
                    >
                      <Box
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>{it.name}</Text>
                      </Box>
                    </TouchableOpacity>
                    <Divider />
                  </Box>
                );
              } else {
                return;
              }
            })}
        </ScrollView>
      </Box>
    </Box>
  );
}

export default RecommendedTags;
