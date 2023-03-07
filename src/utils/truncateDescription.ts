const MAX_DESCRIPTION_LENGTH = 15;

function truncateDescription(description: string): string {
  if (!description) return "";
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH/2) + "..." + description.slice(description.length -5,description.length );
  }
  return description;
}

export default truncateDescription;
