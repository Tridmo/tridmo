import { combineReducers } from '@reduxjs/toolkit';
import { reducer as categories } from '../data/categories';
import { reducer as get_all_brands } from '../data/get_all_brands';
import { reducer as get_all_colors } from '../data/get_all_colors';
import { reducer as get_all_countries } from '../data/get_all_countries';
import { reducer as get_all_designers } from '../data/get_all_designers';
import { reducer as get_all_interiors } from '../data/get_all_interiors';
import { reducer as get_all_materials } from '../data/get_all_materials';
import { reducer as get_all_models } from '../data/get_all_models';
import { reducer as get_all_styles } from '../data/get_all_styles';
import { reducer as get_author_interiors } from '../data/get_author_interiors';
import { reducer as get_brand_models } from '../data/get_brand_models';
import { reducer as get_chat_conversations } from '../data/get_chat_conversations';
import { reducer as get_chat_messages } from '../data/get_chat_messages';
import { reducer as get_chat_token } from '../data/get_chat_token';
import { reducer as get_comments } from '../data/get_comments';
import { reducer as get_designer } from '../data/get_designer';
import { reducer as get_interior_tags } from '../data/get_interior_tags';
import { reducer as get_landingpage_models } from '../data/get_landingpage_models';
import { reducer as get_main_stats } from '../data/get_main_stats';
import { reducer as get_model_platforms } from '../data/get_model_platforms';
import { reducer as get_my_interiors } from '../data/get_my_interiors';
import { reducer as get_my_projects } from '../data/get_my_projects';
import { reducer as get_notifications } from '../data/get_notifications';
import { reducer as get_one_brand } from '../data/get_one_brand';
import { reducer as get_one_interior } from '../data/get_one_interior';
import { reducer as get_one_model } from '../data/get_one_model';
import { reducer as get_one_project } from '../data/get_one_project';
import { reducer as get_profile } from '../data/get_profile';
import { reducer as get_render_platforms } from '../data/get_render_platforms';
import { reducer as get_saved_interiors } from '../data/get_saved_interiors';
import { reducer as get_saved_models } from '../data/get_saved_models';
import { reducer as get_top_models } from '../data/get_top_models';
import { reducer as handle_filters } from '../data/handle_filters';
import { reducer as loader } from '../data/loader';
import { reducer as auth_slicer } from '../data/login';
import { reducer as profile_me } from '../data/me';
import { reducer as modal_checker } from '../data/modal_checker';
import { reducer as update_access_token } from '../data/re-update_access_token';
import { reducer as get_recently_vieweds } from '../data/recently_viewed';
import { reducer as route_crumbs } from '../data/route_crumbs';
import { reducer as search_interior } from '../data/search_interior';
import { reducer as search_model } from '../data/search_model';
import { reducer as set_verified } from '../data/set_verified';
import { reducer as toggle_cart } from '../data/toggle_cart';
import { reducer as toggle_tags } from '../data/toggle_tags';
import { reducer as MenuSlice } from '../data/user_status';


const rootReducer = combineReducers({
  profile_me: profile_me,
  route_crumbs: route_crumbs,
  menu_slice: MenuSlice,
  auth_slicer: auth_slicer,
  modal_checker: modal_checker,
  loader: loader,
  update_access_token: update_access_token,
  categories: categories,
  get_all_models: get_all_models,
  get_all_interiors: get_all_interiors,
  get_author_interiors: get_author_interiors,
  get_one_model: get_one_model,
  get_all_colors: get_all_colors,
  get_all_styles: get_all_styles,
  handle_filters: handle_filters,
  get_profile: get_profile,
  get_recently_vieweds: get_recently_vieweds,
  get_one_brand: get_one_brand,
  get_all_brands: get_all_brands,
  get_all_designers: get_all_designers,
  get_designer: get_designer,
  get_one_interior: get_one_interior,
  search_model: search_model,
  search_interior: search_interior,
  get_brand_models: get_brand_models,
  get_top_models: get_top_models,
  get_comments: get_comments,
  get_model_platforms: get_model_platforms,
  get_render_platforms: get_render_platforms,
  get_all_materials: get_all_materials,
  toggle_cart: toggle_cart,
  get_notifications: get_notifications,
  toggle_tags: toggle_tags,
  get_interior_tags: get_interior_tags,
  get_my_interiors: get_my_interiors,
  get_saved_interiors: get_saved_interiors,
  get_saved_models: get_saved_models,
  get_chat_token: get_chat_token,
  set_verified: set_verified,
  get_chat_conversations: get_chat_conversations,
  get_chat_messages: get_chat_messages,
  get_my_projects: get_my_projects,
  get_one_project: get_one_project,
  get_landingpage_models: get_landingpage_models,
  get_main_stats: get_main_stats,
  get_all_countries: get_all_countries,
});

export default rootReducer;