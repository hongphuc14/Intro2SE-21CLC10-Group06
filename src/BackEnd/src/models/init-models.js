const DataTypes = require("sequelize").DataTypes;
const _admin_se = require("./admin_se");
const _company = require("./company");
const _company_license = require("./company_license");
const _destination = require("./destination");
const _guide_attraction = require("./guide_attraction");
const _guide_booking = require("./guide_booking");
const _guide_language = require("./guide_language");
const _guide_license = require("./guide_license");
const _guide_recently = require("./guide_recently");
const _guide_report = require("./guide_report");
const _guide_review = require("./guide_review");
const _guide_time = require("./guide_time");
const _guide_wishlist = require("./guide_wishlist");
const _languages = require("./languages");
const _role = require("./role");
const _search_history = require("./search_history");
const _tour = require("./tour");
const _tour_booking = require("./tour_booking");
const _tour_category = require("./tour_category");
const _tour_guide = require("./tour_guide");
const _tour_photo = require("./tour_photo");
const _tour_recently = require("./tour_recently");
const _tour_report = require("./tour_report");
const _tour_review = require("./tour_review");
const _tour_wishlist = require("./tour_wishlist");
const _tourist = require("./tourist");

function initModels(sequelize) {
  const admin_se = _admin_se(sequelize, DataTypes);
  const company = _company(sequelize, DataTypes);
  const company_license = _company_license(sequelize, DataTypes);
  const destination = _destination(sequelize, DataTypes);
  const guide_attraction = _guide_attraction(sequelize, DataTypes);
  const guide_booking = _guide_booking(sequelize, DataTypes);
  const guide_language = _guide_language(sequelize, DataTypes);
  const guide_license = _guide_license(sequelize, DataTypes);
  const guide_recently = _guide_recently(sequelize, DataTypes);
  const guide_report = _guide_report(sequelize, DataTypes);
  const guide_review = _guide_review(sequelize, DataTypes);
  const guide_time = _guide_time(sequelize, DataTypes);
  const guide_wishlist = _guide_wishlist(sequelize, DataTypes);
  const languages = _languages(sequelize, DataTypes);
  const role = _role(sequelize, DataTypes);
  const search_history = _search_history(sequelize, DataTypes);
  const tour = _tour(sequelize, DataTypes);
  const tour_booking = _tour_booking(sequelize, DataTypes);
  const tour_category = _tour_category(sequelize, DataTypes);
  const tour_guide = _tour_guide(sequelize, DataTypes);
  const tour_photo = _tour_photo(sequelize, DataTypes);
  const tour_recently = _tour_recently(sequelize, DataTypes);
  const tour_report = _tour_report(sequelize, DataTypes);
  const tour_review = _tour_review(sequelize, DataTypes);
  const tour_wishlist = _tour_wishlist(sequelize, DataTypes);
  const tourist = _tourist(sequelize, DataTypes);

  destination.belongsToMany(tourist, { as: 'id_tourist_tourist_search_histories', through: search_history, foreignKey: "id_des", otherKey: "id_tourist" });
  languages.belongsToMany(tour_guide, { as: 'id_guide_tour_guides', through: guide_language, foreignKey: "id_lang", otherKey: "id_guide" });
  tour.belongsToMany(tourist, { as: 'id_tourist_tourist_tour_recentlies', through: tour_recently, foreignKey: "id_tour", otherKey: "id_tourist" });
  tour.belongsToMany(tourist, { as: 'id_tourist_tourist_tour_reports', through: tour_report, foreignKey: "id_tour", otherKey: "id_tourist" });
  tour.belongsToMany(tourist, { as: 'id_tourist_tourist_tour_wishlists', through: tour_wishlist, foreignKey: "id_tour", otherKey: "id_tourist" });
  tour_guide.belongsToMany(languages, { as: 'id_lang_languages', through: guide_language, foreignKey: "id_guide", otherKey: "id_lang" });
  tour_guide.belongsToMany(tourist, { as: 'id_tourist_tourists', through: guide_recently, foreignKey: "id_guide", otherKey: "id_tourist" });
  tour_guide.belongsToMany(tourist, { as: 'id_tourist_tourist_guide_reports', through: guide_report, foreignKey: "id_guide", otherKey: "id_tourist" });
  tour_guide.belongsToMany(tourist, { as: 'id_tourist_tourist_guide_wishlists', through: guide_wishlist, foreignKey: "id_guide", otherKey: "id_tourist" });
  tourist.belongsToMany(destination, { as: 'id_des_destinations', through: search_history, foreignKey: "id_tourist", otherKey: "id_des" });
  tourist.belongsToMany(tour, { as: 'id_tour_tours', through: tour_recently, foreignKey: "id_tourist", otherKey: "id_tour" });
  tourist.belongsToMany(tour, { as: 'id_tour_tour_tour_reports', through: tour_report, foreignKey: "id_tourist", otherKey: "id_tour" });
  tourist.belongsToMany(tour, { as: 'id_tour_tour_tour_wishlists', through: tour_wishlist, foreignKey: "id_tourist", otherKey: "id_tour" });
  tourist.belongsToMany(tour_guide, { as: 'id_guide_tour_guide_guide_recentlies', through: guide_recently, foreignKey: "id_tourist", otherKey: "id_guide" });
  tourist.belongsToMany(tour_guide, { as: 'id_guide_tour_guide_guide_reports', through: guide_report, foreignKey: "id_tourist", otherKey: "id_guide" });
  tourist.belongsToMany(tour_guide, { as: 'id_guide_tour_guide_guide_wishlists', through: guide_wishlist, foreignKey: "id_tourist", otherKey: "id_guide" });
  company_license.belongsTo(company, { as: "id_company_company", foreignKey: "id_company"});
  company.hasMany(company_license, { as: "company_license", foreignKey: "id_company"});
  tour.belongsTo(company, { as: "id_company_company", foreignKey: "id_company"});
  company.hasMany(tour, { as: "tours", foreignKey: "id_company"});
  search_history.belongsTo(destination, { as: "id_des_destination", foreignKey: "id_des"});
  destination.hasMany(search_history, { as: "search_histories", foreignKey: "id_des"});
  tour.belongsTo(destination, { as: "id_des_destination", foreignKey: "id_des"});
  destination.hasMany(tour, { as: "tours", foreignKey: "id_des"});
  tour_guide.belongsTo(destination, { as: "id_des_destination", foreignKey: "id_des"});
  destination.hasMany(tour_guide, { as: "tour_guides", foreignKey: "id_des"});
  guide_review.belongsTo(guide_booking, { as: "id_guide_booking_guide_booking", foreignKey: "id_guide_booking"});
  guide_booking.hasOne(guide_review, { as: "guide_review", foreignKey: "id_guide_booking"});
  guide_booking.belongsTo(guide_time, { as: "id_guidetime_guide_time", foreignKey: "id_guidetime"});
  guide_time.hasMany(guide_booking, { as: "guide_bookings", foreignKey: "id_guidetime"});
  guide_language.belongsTo(languages, { as: "id_lang_language", foreignKey: "id_lang"});
  languages.hasMany(guide_language, { as: "guide_languages", foreignKey: "id_lang"});
  admin_se.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(admin_se, { as: "admin_ses", foreignKey: "id_role"});
  company.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(company, { as: "companies", foreignKey: "id_role"});
  tour_guide.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(tour_guide, { as: "tour_guides", foreignKey: "id_role"});
  tourist.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(tourist, { as: "tourists", foreignKey: "id_role"});
  tour_booking.belongsTo(tour, { as: "id_tour_tour", foreignKey: "id_tour"});
  tour.hasMany(tour_booking, { as: "tour_bookings", foreignKey: "id_tour"});
  tour_recently.belongsTo(tour, { as: "id_tour_tour", foreignKey: "id_tour"});
  tour.hasMany(tour_recently, { as: "tour_recentlies", foreignKey: "id_tour"});
  tour_report.belongsTo(tour, { as: "id_tour_tour", foreignKey: "id_tour"});
  tour.hasMany(tour_report, { as: "tour_reports", foreignKey: "id_tour"});
  tour_wishlist.belongsTo(tour, { as: "id_tour_tour", foreignKey: "id_tour"});
  tour.hasMany(tour_wishlist, { as: "tour_wishlists", foreignKey: "id_tour"});
  tour_review.belongsTo(tour_booking, { as: "id_tour_booking_tour_booking", foreignKey: "id_tour_booking"});
  tour_booking.hasOne(tour_review, { as: "tour_review", foreignKey: "id_tour_booking"});
  tour.belongsTo(tour_category, { as: "id_category_tour_category", foreignKey: "id_category"});
  tour_category.hasMany(tour, { as: "tours", foreignKey: "id_category"});
  guide_attraction.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_attraction, { as: "guide_attractions", foreignKey: "id_guide"});
  guide_language.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_language, { as: "guide_languages", foreignKey: "id_guide"});
  guide_license.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasOne(guide_license, { as: "guide_license", foreignKey: "id_guide"});
  guide_recently.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_recently, { as: "guide_recentlies", foreignKey: "id_guide"});
  guide_report.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_report, { as: "guide_reports", foreignKey: "id_guide"});
  guide_time.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_time, { as: "guide_times", foreignKey: "id_guide"});
  guide_wishlist.belongsTo(tour_guide, { as: "id_guide_tour_guide", foreignKey: "id_guide"});
  tour_guide.hasMany(guide_wishlist, { as: "guide_wishlists", foreignKey: "id_guide"});
  guide_booking.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(guide_booking, { as: "guide_bookings", foreignKey: "id_tourist"});
  guide_recently.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(guide_recently, { as: "guide_recentlies", foreignKey: "id_tourist"});
  guide_report.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(guide_report, { as: "guide_reports", foreignKey: "id_tourist"});
  guide_wishlist.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(guide_wishlist, { as: "guide_wishlists", foreignKey: "id_tourist"});
  search_history.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(search_history, { as: "search_histories", foreignKey: "id_tourist"});
  tour_booking.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(tour_booking, { as: "tour_bookings", foreignKey: "id_tourist"});
  tour_recently.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(tour_recently, { as: "tour_recentlies", foreignKey: "id_tourist"});
  tour_report.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(tour_report, { as: "tour_reports", foreignKey: "id_tourist"});
  tour_wishlist.belongsTo(tourist, { as: "id_tourist_tourist", foreignKey: "id_tourist"});
  tourist.hasMany(tour_wishlist, { as: "tour_wishlists", foreignKey: "id_tourist"});

  return {
    admin_se,
    company,
    company_license,
    destination,
    guide_attraction,
    guide_booking,
    guide_language,
    guide_license,
    guide_recently,
    guide_report,
    guide_review,
    guide_time,
    guide_wishlist,
    languages,
    role,
    search_history,
    tour,
    tour_booking,
    tour_category,
    tour_guide,
    tour_photo,
    tour_recently,
    tour_report,
    tour_review,
    tour_wishlist,
    tourist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
