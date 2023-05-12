// 能够防止名称写错
export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  data: "zh" | "en";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  data: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): ChangeLanguageAction => {
  console.log("action: changeeeeeeeeeee")
  return {
    type: CHANGE_LANGUAGE,
    data: languageCode,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  console.log("action: adddddd")
  return {
    type: ADD_LANGUAGE,
    data: { name, code },
  };
};
