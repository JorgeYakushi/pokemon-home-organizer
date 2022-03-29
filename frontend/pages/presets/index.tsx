import type { NextPage } from "next";
import styles from "@/styles/presets.module.scss";
import { Header } from "@/components/layout/header";
import { basePresets } from "@/mocks/presets/export/base-presets";
import Select, { createFilter } from "react-select";
import { IDropdown } from "@/interfaces/select.interface";
import { useEffect, useState } from "react";
import { IPreset, IPokemonPreset } from "@/interfaces/presets.interface";
const Presets: NextPage = () => {
  const dropDownList: IDropdown[] = basePresets.map((item, index) => ({
    value: index,
    label: item.name,
  }));
  const [currentPreset, setCurrentPreset] = useState<IPreset>(basePresets[0]);
  const [presetPreview, setPresetPreview] = useState<IPokemonPreset[][]>([]);
  useEffect(() => {
    let data = currentPreset.data;
    let tempArr = [];

    for (let i = 0; i < data.length; i += 30) {
      tempArr.push(data.slice(i, i + 30));
    }
    setPresetPreview(tempArr);
  }, [currentPreset]);
  return (
    <>
      <Header></Header>
      <div className="container main center">
        <div>
          <Select
            options={dropDownList}
            onChange={(e) => setCurrentPreset(basePresets[e?.value!])}
            id="long-value-select"
            instanceId="long-value-select"
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            defaultValue={dropDownList[0]}
          ></Select>
        </div>
        <div>
          <p>{currentPreset.name}</p>
          {presetPreview.map((item, index) => (
            <div key={index}> asd</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Presets;
