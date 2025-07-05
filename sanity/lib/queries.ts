import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug) && !defined($search) || title match $search || description match $search || author->name match $search || category match $search] | order(_created desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`);


export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);