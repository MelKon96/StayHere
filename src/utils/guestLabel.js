export const getGuestLabel = (count, language, searchText) => {
  const category = new Intl.PluralRules(language).select(count);

  switch (category) {
    case 'one':
      return searchText.guest;

    case 'few':
      return searchText.guestsFew ?? searchText.guestsPlural;

    default:
      return searchText.guestsPlural;
  }
};
