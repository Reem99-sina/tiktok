import { tab } from "@/types/common";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
type CustomTabsProps = {
  tabs: tab[];
  activeTab: string;
  onChange: (key: string) => void;
};
const CustomTabs = ({ tabs, activeTab, onChange }: CustomTabsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {tab.label}
            </Text>

            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabs;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  text: {
    color: "#888",
    fontSize: 15,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  indicator: {
    marginTop: 6,
    height: 2,
    width: "60%",
    backgroundColor: "#000",
    borderRadius: 2,
  },
});
