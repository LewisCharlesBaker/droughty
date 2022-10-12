cube (`wh_marketing__web_event_items_fact`, {
sql: `select * from analytics_qa.wh_marketing__web_event_items_fact`,
dimensions: {
web_event_item_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_event_item_pk`,
  description: `Primary key of the event-items table (Unique ID for an event-item)`,
} ,
web_event_fk:  {
  sql: `web_event_fk`,
  type: `string`,
  description: `Primary key of the events table that the record relates to (Unique ID for the event that this record relates to)`,
} ,
web_event_compound_key:  {
  sql: `web_event_compound_key`,
  type: `string`,
  description: `Compound key used to derive the primary key for web events. Derived from the user psuedo ID + ga session ID + web_event_sequence_number.  Where the pseudo ID and ga session ID are null, a substitute number, derived by the row number in order of timestamp is used to populate.`,
} ,
web_event_item_natural_key:  {
  sql: `web_event_item_natural_key`,
  type: `string`,
  description: `Natural key of the event-items table (Event-item ID from the raw data) Supplied as the 'item_id' in the raw GA events data`,
} ,
web_event_item_location_natural_key:  {
  sql: `web_event_item_location_natural_key`,
  type: `string`,
  description: `Natural key for the event-item's location (Event-item's location ID from the raw data) Supplied as the 'location_id' in the raw GA events data`,
} ,
web_event_item_list_natural_key:  {
  sql: `web_event_item_list_natural_key`,
  type: `string`,
  description: `Natural key for the event-item's list (Event-item's list ID from the raw data) Supplied as the 'item_list_id' in the raw GA events data`,
} ,
web_event_item_promotion_natural_key:  {
  sql: `web_event_item_promotion_natural_key`,
  type: `string`,
  description: `Natural key for the event-item's promotion (Event-item's promotion ID from the raw data) Supplied as the 'promotion_id' in the raw GA events data`,
} ,
web_event_item_name:  {
  sql: `web_event_item_name`,
  type: `string`,
  description: `Name of the event-item (High-level vehicle description as displayed in the search listing or the VDP)`,
} ,
web_event_item_division:  {
  sql: `web_event_item_division`,
  type: `string`,
  description: `Division of the event-item (Vehicle division e.g. JLR, Specialist) Supplied as the 'affiliation' in the raw GA events data`,
} ,
web_event_item_brand:  {
  sql: `web_event_item_brand`,
  type: `string`,
  description: `Brand of the event-item (Brand of the vehicle)`,
} ,
web_event_item_body_type:  {
  sql: `web_event_item_body_type`,
  type: `string`,
  description: `Body type of the event-item (Vehicle body type e.g. coupe, hatchback) Supplied as the 'item_variant' in the raw GA events data`,
} ,
web_event_item_classification_type:  {
  sql: `web_event_item_classification_type`,
  type: `string`,
  description: `Classification type of the event-item (Vehicle classification type e.g. new, used) Supplied as the 'item_category' in the raw GA events data`,
} ,
web_event_item_range:  {
  sql: `web_event_item_range`,
  type: `string`,
  description: `Range of the event-item (Vehicle range e.g. A3) Supplied as the 'item_category2' in the raw GA events data`,
} ,
web_event_item_model:  {
  sql: `web_event_item_model`,
  type: `string`,
  description: `Model of the event-item (Vehicle model e.g. Sportback) Supplied as the 'item_category3' in the raw GA events data`,
} ,
web_event_item_derivative:  {
  sql: `web_event_item_derivative`,
  type: `string`,
  description: `Derivative of the event-item (Vehicle derivative e.g. Vorsprung) Supplied as the 'item_category4' in the raw GA events data`,
} ,
web_event_item_trim:  {
  sql: `web_event_item_trim`,
  type: `string`,
  description: `Trim/Specification of the event-item (Vehicle trim / specification e.g. Comfort and Soundpack) Supplied as the 'item_category5' in the raw GA events data`,
} ,
web_event_item_price_in_usd:  {
  sql: `web_event_item_price_in_usd`,
  type: `numeric`,
  description: `The price of the event-item in US Dollars (Vehicle price in USD)`,
} ,
web_event_item_price:  {
  sql: `web_event_item_price`,
  type: `numeric`,
  description: `The price of the event-item in local currency (Vehicle price in local currency = GBP)`,
} ,
web_event_item_quantity:  {
  sql: `web_event_item_quantity`,
  type: `numeric`,
  description: `The number of units for this event-item included in this ecommerce event (should always be 1 in our context)`,
} ,
web_event_item_revenue_in_usd:  {
  sql: `web_event_item_revenue_in_usd`,
  type: `numeric`,
  description: `The revenue of the event-item in US Dollars, calculated as item_price_in_usd * item_quantity (Vehicle revenue in USD) This is only populated for purchase events`,
} ,
web_event_item_revenue:  {
  sql: `web_event_item_revenue`,
  type: `numeric`,
  description: `The revenue of the event-item in local currency, calculated as item_price * item_quantity (Vehicle revenue in local currency = GBP) This is only populated for purchase events`,
} ,
web_event_item_refund_in_usd:  {
  sql: `web_event_item_refund_in_usd`,
  type: `numeric`,
  description: `The refund value of the event-item in US Dollars, calculated as item_price_in_usd * item_quantity (Vehicle revenue in USD) This is only populated for refund events`,
} ,
web_event_item_refund:  {
  sql: `web_event_item_refund`,
  type: `numeric`,
  description: `The refund value of the event-item in local currency, calculated as item_price * item_quantity (Vehicle revenue in local currency = GBP) This is only populated for refund events`,
} ,
web_event_item_coupon:  {
  sql: `web_event_item_coupon`,
  type: `string`,
  description: `Coupon code applied to this event-item`,
} ,
web_event_item_list_name:  {
  sql: `web_event_item_list_name`,
  type: `string`,
  description: `Name of the list in which the event-item was presented to the website visitor`,
} ,
web_event_item_list_index:  {
  sql: `web_event_item_list_index`,
  type: `string`,
  description: `Position of the event-item in a list`,
} ,
web_event_item_promotion_name:  {
  sql: `web_event_item_promotion_name`,
  type: `string`,
  description: `Name of the promotion associated to this event-item`,
} ,
web_event_item_creative_name:  {
  sql: `web_event_item_creative_name`,
  type: `string`,
  description: `Name of a creative used in a promotional spot for this event-item`,
} ,
web_event_item_creative_slot:  {
  sql: `web_event_item_creative_slot`,
  type: `string`,
  description: `Name of a creative slot for this event-item`,
} ,
} ,
measures: {
count_of_web_event_item_pk:  {
  sql: `web_event_item_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_event_parameters_fact`, {
sql: `select * from analytics_qa.wh_marketing__web_event_parameters_fact`,
dimensions: {
web_event_parameter_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_event_parameter_pk`,
  description: `Primary key of the event parameters table (Unique ID for an event parameter)`,
} ,
web_event_fk:  {
  sql: `web_event_fk`,
  type: `string`,
  description: `Primary key of the events table that the record relates to (Unique ID for the event that this record relates to)`,
} ,
web_event_parameter_compound_key:  {
  sql: `web_event_parameter_compound_key`,
  type: `string`,
  description: `Natural key of the event parameters table (event parameter ID from the raw data). Compound of session ID + event row number + event parameters key`,
} ,
web_event_parameter_key:  {
  sql: `web_event_parameter_key`,
  type: `string`,
  description: `The name of the event parameter`,
} ,
web_event_parameter_string_value:  {
  sql: `web_event_parameter_string_value`,
  type: `string`,
  description: `The string value of the event parameter, if one exists`,
} ,
web_event_parameter_int_value:  {
  sql: `web_event_parameter_int_value`,
  type: `int64`,
  description: `The integer value of the event parameter, if one exists`,
} ,
web_event_parameter_float_value:  {
  sql: `web_event_parameter_float_value`,
  type: `float64`,
  description: `The float value of the event parameter, if one exists`,
} ,
web_event_parameter_double_value:  {
  sql: `web_event_parameter_double_value`,
  type: `float64`,
  description: `The double value of the event parameter, if one exists`,
} ,
} ,
measures: {
count_of_web_event_parameter_pk:  {
  sql: `web_event_parameter_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_event_query_parameters_fact`, {
sql: `select * from analytics_qa.wh_marketing__web_event_query_parameters_fact`,
dimensions: {
web_event_query_parameter_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_event_query_parameter_pk`,
  description: `Primary key of the query_parameters table (surrogate key of web_event_query_parameter_compound_key)`,
} ,
web_event_fk:  {
  sql: `web_event_fk`,
  type: `string`,
  description: `Primary key of the events table that the record relates to (Unique ID for the event that this record relates to)`,
} ,
web_event_query_parameter_compound_key:  {
  sql: `web_event_query_parameter_compound_key`,
  type: `string`,
  description: `Compound of web_event_compound_key, web_event_query_parameter_name, and web_event_query_parameter_value`,
} ,
web_event_query_parameter_name:  {
  sql: `web_event_query_parameter_name`,
  type: `string`,
  description: `The parameter name`,
} ,
web_event_query_parameter_value:  {
  sql: `web_event_query_parameter_value`,
  type: `string`,
  description: `The parameter value`,
} ,
} ,
measures: {
count_of_web_event_query_parameter_pk:  {
  sql: `web_event_query_parameter_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_event_visitor_properties_fact`, {
sql: `select * from analytics_qa.wh_marketing__web_event_visitor_properties_fact`,
dimensions: {
web_event_visitor_property_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_event_visitor_property_pk`,
  description: `Primary key of the event-visitor-property table (Unique ID for an event-visitor property)`,
} ,
web_event_fk:  {
  sql: `web_event_fk`,
  type: `string`,
  description: `Primary key of the events table that the record relates to (Unique ID for the event that this record relates to)`,
} ,
web_event_visitor_property_compound_key:  {
  sql: `web_event_visitor_property_compound_key`,
  type: `string`,
  description: `Natural key of the event-visitor-property table (Event-visitor-property ID from the raw data). Compound of session ID + event row number + visitor property key`,
} ,
web_event_visitor_property_key:  {
  sql: `web_event_visitor_property_key`,
  type: `string`,
  description: `The name of the visitor-property`,
} ,
web_event_visitor_property_string_value:  {
  sql: `web_event_visitor_property_string_value`,
  type: `string`,
  description: `The string value of the visitor-property, if one exists`,
} ,
web_event_visitor_property_int_value:  {
  sql: `web_event_visitor_property_int_value`,
  type: `int64`,
  description: `The integer value of the visitor-property, if one exists`,
} ,
web_event_visitor_property_float_value:  {
  sql: `web_event_visitor_property_float_value`,
  type: `float64`,
  description: `The float value of the visitor-property, if one exists`,
} ,
web_event_visitor_property_double_value:  {
  sql: `web_event_visitor_property_double_value`,
  type: `float64`,
  description: `The double value of the visitor-property, if one exists`,
} ,
} ,
measures: {
count_of_web_event_visitor_property_pk:  {
  sql: `web_event_visitor_property_pk`,
  type: `count`,
} ,
}});
