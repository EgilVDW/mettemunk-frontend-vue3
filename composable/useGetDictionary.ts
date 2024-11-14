import * as cmsHelper from "../resources/datoCmsHelper";

export const useGetDictionary = () => {
  const fetcedDictionaries = ref();

  const getDictionaries = async () => {
    if (fetcedDictionaries.value) return fetcedDictionaries.value;

    const dictionaries = await cmsHelper.GetDictionary();
    fetcedDictionaries.value = dictionaries;
    return dictionaries;
  };

  return { getDictionaries };
};
