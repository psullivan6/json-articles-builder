export const htmlTemplate = ({
  category,
  description,
  linkTitle,
  linkURL,
  order,
  section
}) =>
  `<div class="url">
  <a href="${linkURL}" target="_blank">${linkTitle}</a>
</div>
<div class="description">${description}</div>
<div class="category">${category}</div>
<div class="section">${section}</div>
<div class="order">${order}</div>`;

export const jsonTemplate = ({
  category,
  description,
  linkTitle,
  linkURL,
  order,
  section
}) =>
  `{
  "link" : "${linkURL}",
  "title": "${linkTitle}",
  "description": "${description}",
  "category": "${category}",
  "section": "${section}",
  "order": ${order}
}`;
