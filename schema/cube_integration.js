cube (`wh_marketing__web_events_fact`, {
sql: `select * from analytics_qa.wh_marketing__web_events_fact`,
joins : {
wh_marketing__web_event_items_fact:  {
  relationship: `belongsTo`,
  sql: `${CUBE.web_event_pk} = ${wh_marketing__web_event_items_fact.web_event_fk}`,
} ,
wh_marketing__web_event_query_parameters_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_event_pk} = ${wh_marketing__web_event_query_parameters_fact.web_event_fk}`,
} ,
wh_marketing__web_event_visitor_properties_fact:  {
  relationship: `belongsTo`,
  sql: `${CUBE.web_event_pk} = ${wh_marketing__web_event_visitor_properties_fact.web_event_fk}`,
} ,
wh_marketing__web_event_parameters_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_event_pk} = ${wh_marketing__web_event_parameters_fact.web_event_fk}`,
} ,
}, 
dimensions: {
web_event_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_event_pk`,
  description: `Primary key of the events table (Unique ID for an event)`,
} ,
web_session_fk:  {
  sql: `web_session_fk`,
  type: `string`,
  description: `Primary key of the sessions table that the event relates to (Unique ID for the session that fired this event)`,
} ,
web_visitor_fk:  {
  sql: `web_visitor_fk`,
  type: `string`,
  description: `Primary key of the visitors table (Unique ID for the visitor who conducted this session)`,
} ,
web_event_compound_key:  {
  sql: `web_event_compound_key`,
  type: `string`,
  description: `Compound key used to derive the primary key for web events. Derived from the user psuedo ID + ga session ID + web_event_sequence_number.  Where the pseudo ID and ga session ID are null, a substitute number, derived by the row number in order of timestamp is used to populate.`,
} ,
web_event_session_compound_key:  {
  sql: `web_event_session_compound_key`,
  type: `string`,
  description: `A concatenation of the raw GA session ID and user pseudo ID from the raw GA data; The ga_session_id supplied in the event parameter in the raw GA data.`,
} ,
web_event_user_natural_key:  {
  sql: `web_event_user_natural_key`,
  type: `string`,
  description: `User ID from the raw GA data. This provides the 'known user ID' from our website, where it is set via the setUserId API via Google Analytics (GA). Customer accounts are not yet active on our websites so this column is not yet in use and will therefore be NULL for all records.`,
} ,
web_event_visitor_natural_key:  {
  sql: `web_event_visitor_natural_key`,
  type: `string`,
  description: `Visitor ID from the raw GA data. This provides the 'GA Client ID' from Google Analytics (GA) which is supplied in the user_pseudo_id column in the raw GA data. This is merely a GA cookie ID, which identifies an anonymous visitor to our website, which is unique to the visitor's device and browser.`,
} ,
web_event_session_natural_key:  {
  sql: `web_event_session_natural_key`,
  type: `string`,
  description: `Session ID from the raw GA data (which comes through as an event parameter called 'ga_session_id')`,
} ,
web_event_sequence_number:  {
  sql: `web_event_sequence_number`,
  type: `int64`,
  description: `Sequence number for the event within its session i.e. A data value of 1 identifies the first event in a session`,
} ,
web_event_bundle_sequence_natural_key:  {
  sql: `web_event_bundle_sequence_natural_key`,
  type: `string`,
  description: `Sequential ID of the bundle in which these events were uploaded by Google Analytics. Provided as 'event_bundle_sequence_id' in the raw GA data.`,
} ,
web_event_vehicle_deal_natural_key:  {
  sql: `web_event_vehicle_deal_natural_key`,
  type: `string`,
  description: `Sytner vehicle deal ID; a unique ID for the vehicle and this instance of attempting to sell it i.e. If we have had the same physical vehicle on our books to sell more than once, then there will be more than one vehicle deal ID for the same physical vehicle; there will be one vehicle deal ID for each time we have had it on our books to sell`,
} ,
web_event_ecommerce_transaction_natural_key:  {
  sql: `web_event_ecommerce_transaction_natural_key`,
  type: `string`,
  description: `Raw ecommerce ID from Google Analytics (GA)`,
} ,
web_event_data_source:  {
  sql: `web_event_data_source`,
  type: `string`,
  description: `The data source that has provided the event e.g. Data value will be 'ga4' for records coming from Google Analytics (GA)`,
} ,
web_event_website_property:  {
  sql: `web_event_website_property`,
  type: `string`,
  description: `The website related to the data source`,
} ,
web_event_table_suffix:  {
  sql: `web_event_table_suffix`,
  type: `string`,
  description: `The BigQuery table suffix`,
} ,
web_event_name:  {
  sql: `web_event_name`,
  type: `string`,
  description: `The name of the event`,
} ,
web_event_page_type:  {
  sql: `web_event_page_type`,
  type: `string`,
  description: `Website page type e.g. vdp (for a vehicle details page), srp (for a search results page)`,
} ,
web_event_page_hostname:  {
  sql: `web_event_page_hostname`,
  type: `string`,
  description: `Website page hostname e.g. sytner.co.uk`,
} ,
web_event_page_location:  {
  sql: `web_event_page_location`,
  type: `string`,
  description: `Website page URL`,
} ,
web_event_page_location_without_query_parameters:  {
  sql: `web_event_page_location_without_query_parameters`,
  type: `string`,
  description: `Website page URL without query parameters`,
} ,
web_event_page_title:  {
  sql: `web_event_page_title`,
  type: `string`,
  description: `Website page title`,
} ,
web_event_page_referrer:  {
  sql: `web_event_page_referrer`,
  type: `string`,
  description: `The URL of the previously loaded website page`,
} ,
web_event_page_referrer_without_query_parameters:  {
  sql: `web_event_page_referrer_without_query_parameters`,
  type: `string`,
  description: `The URL without query parameters of the previously loaded website page`,
} ,
web_event_page_referrer_ignore:  {
  sql: `web_event_page_referrer_ignore`,
  type: `string`,
  description: `A data value of 'true' in this column indicates that the web_event_page_referrer should be ignored due to it being an invalid referrer`,
} ,
web_event_link_text:  {
  sql: `web_event_link_text`,
  type: `string`,
  description: `For the click, click_button, click_link events; this column holds the text for the link that was clicked, as it appeared on the website front-end. For click_image events; this column holds the alt-text for the image (from the image meta data)`,
} ,
web_event_link_domain:  {
  sql: `web_event_link_domain`,
  type: `string`,
  description: `Domain name of the destination URL for a click event or file download event`,
} ,
web_event_link_url:  {
  sql: `web_event_link_url`,
  type: `string`,
  description: `Full destination URL for a click event or file download event`,
} ,
web_event_channel:  {
  sql: `web_event_channel`,
  type: `string`,
  description: `Channel of the traffic source attributed to the event e.g. direct, email, referral, display, paid search`,
} ,
web_event_source:  {
  sql: `web_event_source`,
  type: `string`,
  description: `Source of the traffic source attributed to the event e.g. google, facebook, autotrader, (direct)`,
} ,
web_event_medium:  {
  sql: `web_event_medium`,
  type: `string`,
  description: `Medium of the traffic source attributed to the event e.g. organic, cpc, partner, social`,
} ,
web_event_campaign:  {
  sql: `web_event_campaign`,
  type: `string`,
  description: `Campaign name of the traffic source attributed to the event`,
} ,
web_event_content:  {
  sql: `web_event_content`,
  type: `string`,
  description: `Ad content of the traffic source attributed to the event (which can be set via the utm_content URL parameter)`,
} ,
web_event_term:  {
  sql: `web_event_term`,
  type: `string`,
  description: `Keyword term of the traffic source attributed to the event (which is usually set when the medium of the traffic source is 'organic' or 'cpc'). This can be set via the utm_term URL parameter`,
} ,
web_event_visitor_first_campaign:  {
  sql: `web_event_visitor_first_campaign`,
  type: `string`,
  description: `Campaign name of the traffic source that first acquired the visitor, according to the raw GA data`,
} ,
web_event_visitor_first_medium:  {
  sql: `web_event_visitor_first_medium`,
  type: `string`,
  description: `Medium of the traffic source that first acquired the visitor, according to the raw GA data e.g. organic, cpc, partner, social`,
} ,
web_event_visitor_first_source:  {
  sql: `web_event_visitor_first_source`,
  type: `string`,
  description: `Source of the traffic source that first acquired the visitor, according to the raw GA data e.g. google, facebook, autotrader, (direct)`,
} ,
web_event_division:  {
  sql: `web_event_division`,
  type: `string`,
  description: `Division attributed to the event (derived from the web_event_brand)`,
} ,
web_event_brand:  {
  sql: `web_event_brand`,
  type: `string`,
  description: `Brand attributed to the event (as supplied in the raw GA data in the 'brand' or 'item_brand' event parameters)`,
} ,
web_event_intent:  {
  sql: `web_event_intent`,
  type: `string`,
  description: `Intent attributed to the event (as supplied in the raw GA data in the 'intent' event parameter)`,
} ,
web_event_intent_rank:  {
  sql: `web_event_intent_rank`,
  type: `numeric`,
  description: ``,
} ,
web_event_mf_level:  {
  sql: `web_event_mf_level`,
  type: `string`,
  description: `Measurement framework level attributed to the event (as supplied in the raw GA data in the 'mf' event parameter, or derived from the event name)`,
} ,
web_event_mf_sub_level:  {
  sql: `web_event_mf_sub_level`,
  type: `string`,
  description: `Measurement framework sub-level attributed to the event (as derived from the web_event_intent, event_name and web_event_page_type)`,
} ,
web_event_device_category:  {
  sql: `web_event_device_category`,
  type: `string`,
  description: `Device category e.g. mobile, tablet, desktop`,
} ,
web_event_device_mobile_brand_name:  {
  sql: `web_event_device_mobile_brand_name`,
  type: `string`,
  description: `Device brand name (for a mobile device)`,
} ,
web_event_device_mobile_model_name:  {
  sql: `web_event_device_mobile_model_name`,
  type: `string`,
  description: `Device model name (for a mobile device)`,
} ,
web_event_device_mobile_marketing_name:  {
  sql: `web_event_device_mobile_marketing_name`,
  type: `string`,
  description: `Device marketing name (for a mobile device)`,
} ,
web_event_device_mobile_os_hardware_model:  {
  sql: `web_event_device_mobile_os_hardware_model`,
  type: `string`,
  description: `Device model information retrieved directly from the operating system (for a mobile device)`,
} ,
web_event_device_operating_system:  {
  sql: `web_event_device_operating_system`,
  type: `string`,
  description: `Operating system of the device`,
} ,
web_event_device_operating_system_version:  {
  sql: `web_event_device_operating_system_version`,
  type: `string`,
  description: `Operating system version of the device`,
} ,
web_event_device_vendor_id:  {
  sql: `web_event_device_vendor_id`,
  type: `string`,
  description: `IDFV (only present if the IDFA is not collected in the web_event_device_advertising_id column)`,
} ,
web_event_device_advertising_id:  {
  sql: `web_event_device_advertising_id`,
  type: `string`,
  description: `Advertising ID for the device (IDFA)`,
} ,
web_event_device_language:  {
  sql: `web_event_device_language`,
  type: `string`,
  description: `Language set in the device's operating system`,
} ,
web_event_device_is_limited_ad_tracking:  {
  sql: `web_event_device_is_limited_ad_tracking`,
  type: `string`,
  description: `The 'Limit Ad Tracking' setting for the device. On iOS14+, this returns 'false' if the IDFA is non-zero (in the web_event_device_advertising_id column)`,
} ,
web_event_device_browser:  {
  sql: `web_event_device_browser`,
  type: `string`,
  description: `Browser used by the visitor to browse the website`,
} ,
web_event_device_browser_version:  {
  sql: `web_event_device_browser_version`,
  type: `string`,
  description: `Version of the browser used by the visitor to browse the website`,
} ,
web_event_device_screen_resolution:  {
  sql: `web_event_device_screen_resolution`,
  type: `string`,
  description: `Device screen resolution`,
} ,
web_event_geo_continent:  {
  sql: `web_event_geo_continent`,
  type: `string`,
  description: `Continent from which the event was reported, based on the visitor's IP address`,
} ,
web_event_geo_sub_continent:  {
  sql: `web_event_geo_sub_continent`,
  type: `string`,
  description: `Sub-continent from which the event was reported, based on the visitor's IP address`,
} ,
web_event_geo_country:  {
  sql: `web_event_geo_country`,
  type: `string`,
  description: `Country from which the event was reported, based on the visitor's IP address`,
} ,
web_event_geo_region:  {
  sql: `web_event_geo_region`,
  type: `string`,
  description: `Region from which the event was reported, based on the visitor's IP address`,
} ,
web_event_geo_metro:  {
  sql: `web_event_geo_metro`,
  type: `string`,
  description: `Metro from which the event was reported, based on the visitor's IP address`,
} ,
web_event_geo_city:  {
  sql: `web_event_geo_city`,
  type: `string`,
  description: `City from which the event was reported, based on the visitor's IP address`,
} ,
web_event_cms_card_title:  {
  sql: `web_event_cms_card_title`,
  type: `string`,
  description: `CMS taxonomy parameter: card title`,
} ,
web_event_cms_card_name:  {
  sql: `web_event_cms_card_name`,
  type: `string`,
  description: `CMS taxonomy parameter: card name`,
} ,
web_event_cms_card_position:  {
  sql: `web_event_cms_card_position`,
  type: `string`,
  description: `CMS taxonomy parameter: card position`,
} ,
web_event_cms_slice_name:  {
  sql: `web_event_cms_slice_name`,
  type: `string`,
  description: `CMS taxonomy parameter: slice name`,
} ,
web_event_cms_slice_position:  {
  sql: `web_event_cms_slice_position`,
  type: `string`,
  description: `CMS taxonomy parameter: slice position`,
} ,
web_event_cms_component_title:  {
  sql: `web_event_cms_component_title`,
  type: `string`,
  description: `CMS taxonomy parameter: component title`,
} ,
web_event_cms_component_name:  {
  sql: `web_event_cms_component_name`,
  type: `string`,
  description: `CMS taxonomy parameter: component name`,
} ,
web_event_cms_component_position:  {
  sql: `web_event_cms_component_position`,
  type: `string`,
  description: `CMS taxonomy parameter: component position`,
} ,
web_event_cms_clickable_element_title:  {
  sql: `web_event_cms_clickable_element_title`,
  type: `string`,
  description: `CMS taxonomy parameter: clickable element title`,
} ,
web_event_cms_clickable_element_name:  {
  sql: `web_event_cms_clickable_element_name`,
  type: `string`,
  description: `CMS taxonomy parameter: clickable element name`,
} ,
web_event_cms_clickable_element_position:  {
  sql: `web_event_cms_clickable_element_position`,
  type: `string`,
  description: `CMS taxonomy parameter: clickable element position`,
} ,
web_event_cms_block_position:  {
  sql: `web_event_cms_block_position`,
  type: `string`,
  description: `CMS taxonomy parameter: block position`,
} ,
web_event_enquiry_template:  {
  sql: `web_event_enquiry_template`,
  type: `string`,
  description: `For events relating to enquiry forms: Name of the enquiry form template used`,
} ,
web_event_enquiry_topic:  {
  sql: `web_event_enquiry_topic`,
  type: `string`,
  description: `For events relating to enquiry forms: Enquiry topic`,
} ,
web_event_enquiry_category:  {
  sql: `web_event_enquiry_category`,
  type: `string`,
  description: `For events relating to enquiry forms: Enquiry category`,
} ,
web_event_enquiry_sub_category:  {
  sql: `web_event_enquiry_sub_category`,
  type: `string`,
  description: `For events relating to enquiry forms: Enquiry sub-category`,
} ,
web_event_error_type:  {
  sql: `web_event_error_type`,
  type: `string`,
  description: `For events relating to errors: Error type`,
} ,
web_event_error_details:  {
  sql: `web_event_error_details`,
  type: `string`,
  description: `For events relating to errors: Details of the error`,
} ,
web_event_purchase_type:  {
  sql: `web_event_purchase_type`,
  type: `string`,
  description: `For purchase events: Type of purchase transaction`,
} ,
web_event_content_type:  {
  sql: `web_event_content_type`,
  type: `string`,
  description: `For select_content events: Type of content selected`,
} ,
web_event_search_type:  {
  sql: `web_event_search_type`,
  type: `string`,
  description: `For search-related events: Search type`,
} ,
web_event_search_term:  {
  sql: `web_event_search_term`,
  type: `string`,
  description: `For search-related events: Search term`,
} ,
web_event_debug_mode:  {
  sql: `web_event_debug_mode`,
  type: `string`,
  description: `A data value of 1 in this column indicates that the event came from a device that is running in debug mode (using the 'GA debug' chrome extension)`,
} ,
web_event_outbound_link_click:  {
  sql: `web_event_outbound_link_click`,
  type: `string`,
  description: `A data value of 'true' in this column indicates that the event was for a click event, which took the visitor away from the current domain (and redirected them to an external domain i.e. took them to an external website)`,
} ,
web_event_privacy_info_ads_storage:  {
  sql: `web_event_privacy_info_ads_storage`,
  type: `string`,
  description: `Indicates whether the visitor consented to ads storage (advertising cookies)`,
} ,
web_event_privacy_info_analytics_storage:  {
  sql: `web_event_privacy_info_analytics_storage`,
  type: `string`,
  description: `Indicates whether the visitor consented to analytics storage (analytics cookies)`,
} ,
web_event_privacy_info_uses_transient_token:  {
  sql: `web_event_privacy_info_uses_transient_token`,
  type: `string`,
  description: `Indicates whether the visitor denied analytics storage (analytics cookies) and the developer has enabled measurement without cookies based on transient tokens in server data`,
} ,
web_event_ecommerce_total_item_quantity:  {
  sql: `web_event_ecommerce_total_item_quantity`,
  type: `numeric`,
  description: `For ecommerce events: The total number of items in this event (based on the sum of web_event_items_fact.web_event_item_quantity)`,
} ,
web_event_ecommerce_unique_items:  {
  sql: `web_event_ecommerce_unique_items`,
  type: `numeric`,
  description: `For ecommerce events: The number of unique items in this event (based on the unique combinations of item_id, item_name and item_brand (from web_event_items_fact))`,
} ,
web_event_ecommerce_purchase_revenue_in_usd:  {
  sql: `web_event_ecommerce_purchase_revenue_in_usd`,
  type: `numeric`,
  description: `For ecommerce purchase events: The purchase revenue of this event, represented in US Dollars (where the revenue is calculated as the price * quantity)`,
} ,
web_event_ecommerce_purchase_revenue:  {
  sql: `web_event_ecommerce_purchase_revenue`,
  type: `numeric`,
  description: `For ecommerce purchase events: The purchase revenue of this event, represented in local currency (where the revenue is calculated as the price * quantity)`,
} ,
web_event_ecommerce_refund_value_in_usd:  {
  sql: `web_event_ecommerce_refund_value_in_usd`,
  type: `numeric`,
  description: `For ecommerce refund events: The refund amount of this event, represented in US Dollars (where the refund amount is calculated as the price * quantity)`,
} ,
web_event_ecommerce_refund_value:  {
  sql: `web_event_ecommerce_refund_value`,
  type: `numeric`,
  description: `For ecommerce refund events: The refund amount of this event, represented in local currency (where the refund amount is calculated as the price * quantity)`,
} ,
web_event_ecommerce_shipping_value_in_usd:  {
  sql: `web_event_ecommerce_shipping_value_in_usd`,
  type: `numeric`,
  description: `For ecommerce events: The shipping cost of this event, represented in US Dollars (where we have repurposed the 'shipping info' to cover our 'billing info')`,
} ,
web_event_ecommerce_shipping_value:  {
  sql: `web_event_ecommerce_shipping_value`,
  type: `numeric`,
  description: `For ecommerce events: The shipping cost of this event, represented in local currency (where we have repurposed the 'shipping info' to cover our 'billing info')`,
} ,
web_event_ecommerce_tax_value_in_usd:  {
  sql: `web_event_ecommerce_tax_value_in_usd`,
  type: `numeric`,
  description: `For ecommerce events: The tax value in this event, represented in US Dollars`,
} ,
web_event_ecommerce_tax_value:  {
  sql: `web_event_ecommerce_tax_value`,
  type: `numeric`,
  description: `For ecommerce events: The tax value in this event, represented in local currency`,
} ,
web_event_value_in_usd:  {
  sql: `web_event_value_in_usd`,
  type: `numeric`,
  description: `The currency-converted value (in US Dollars) of the event's value parameter`,
} ,
web_event_entrances:  {
  sql: `web_event_entrances`,
  type: `numeric`,
  description: `A data value of 1 in this column indicates that the event is for an entrance to the website`,
} ,
web_event_device_time_zone_offset_seconds:  {
  sql: `web_event_device_time_zone_offset_seconds`,
  type: `int64`,
  description: `Device's offset from the GMT time zone in seconds`,
} ,
web_event_ga_engaged_event:  {
  sql: `web_event_ga_engaged_event`,
  type: `numeric`,
  description: `A data value of 'true' in this column indicates that the event caused Google Analytics (GA) to count the session as an 'engaged session', according to GA's own definition of 'engagement', namely: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_event_was_visitor_natural_key_null:  {
  sql: `web_event_was_visitor_natural_key_null`,
  type: `int64`,
  description: `Flag to identify if the original value for the visitor natural key was null in the source data, and subsequently populated with a surrogate key`,
} ,
web_event_was_session_natural_key_null:  {
  sql: `web_event_was_session_natural_key_null`,
  type: `int64`,
  description: `Flag to identify if the original value for the session natural key was null in the source data, and subsequently populated with a surrogate key`,
} ,
web_event_visitor_ga_first_touch_ts:  {
  sql: `web_event_visitor_ga_first_touch_ts`,
  type: `timestamp`,
  description: `The time at which the user first opened the app or visited the site as record by GA`,
} ,
web_event_dt:  {
  sql: `web_event_dt`,
  type: `date`,
  description: `The date that the event fired (using UTC time zone)`,
} ,
web_event_ts:  {
  sql: `web_event_ts`,
  type: `timestamp`,
  description: `The timestamp that the event fired (using UTC time zone)`,
} ,
web_event_server_timestamp_offset_ts:  {
  sql: `web_event_server_timestamp_offset_ts`,
  type: `timestamp`,
  description: `Timestamp offset between collection time and upload time in micro seconds`,
} ,
} ,
measures: {
count_of_web_event_pk:  {
  sql: `web_event_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_visitors_xa`, {
sql: `select * from analytics_qa.wh_marketing__web_visitors_xa`,
joins : {
wh_marketing__web_sessions_xa:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_sessions_xa.web_visitor_fk}`,
} ,
wh_marketing__web_events_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_events_fact.web_visitor_fk}`,
} ,
}, 
dimensions: {
web_visitor_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_visitor_pk`,
  description: `Primary key of the visitors table (surrogate key of web_event_visitor_natural_key)`,
} ,
web_event_user_natural_key:  {
  sql: `web_event_user_natural_key`,
  type: `string`,
  description: `User ID from the raw GA data. This provides the 'known user ID' from our website, where it is set via the setUserId API via Google Analytics (GA). Customer accounts are not yet active on our websites so this column is not yet in use and will therefore be NULL for all records.`,
} ,
web_event_visitor_natural_key:  {
  sql: `web_event_visitor_natural_key`,
  type: `string`,
  description: `Visitor ID from the raw GA data. This provides the 'GA Client ID' from Google Analytics (GA) which is supplied in the user_pseudo_id column in the raw GA data. This is merely a GA cookie ID, which identifies an anonymous visitor to our website, which is unique to the visitor's device and browser.`,
} ,
web_visitor_wh_generated:  {
  sql: `web_visitor_wh_generated`,
  type: `int64`,
  description: `Flag to identify whether the visitor has been generated by the warehouse (with data value = 1) as opposed to identifying a visitor that came through in the GA clickstream data (with data value = 0)`,
} ,
web_visitor_data_source:  {
  sql: `web_visitor_data_source`,
  type: `string`,
  description: `The data source that has provided the session e.g. Data value will be 'ga4' for records coming from Google Analytics (GA)`,
} ,
web_visitor_website_property:  {
  sql: `web_visitor_website_property`,
  type: `string`,
  description: `The website related to the data source`,
} ,
web_visitor_total_sessions:  {
  sql: `web_visitor_total_sessions`,
  type: `int64`,
  description: `Total number of sessions for the visitor`,
} ,
web_visitor_total_events:  {
  sql: `web_visitor_total_events`,
  type: `int64`,
  description: `Total number of events (across all sessions) for the visitor`,
} ,
web_visitor_ga_engaged_visitor:  {
  sql: `web_visitor_ga_engaged_visitor`,
  type: `int64`,
  description: `A data value of 'true' in this column indicates that Google Analytics (GA) has deemed the visitor to be an 'engaged visitor' (because it has one or more events that were deemed to be an 'engaged event'). Where GA's definition of 'engagement' is as follows: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_visitor_total_page_views:  {
  sql: `web_visitor_total_page_views`,
  type: `int64`,
  description: `Total number of page_view events across all sessions for the visitor`,
} ,
web_visitor_total_search_results_page_views:  {
  sql: `web_visitor_total_search_results_page_views`,
  type: `int64`,
  description: `Total number of search result (SRP) page_view events across all sessions for the visitorfor the visitor`,
} ,
web_visitor_total_vehicle_details_page_views:  {
  sql: `web_visitor_total_vehicle_details_page_views`,
  type: `int64`,
  description: `Total number of vehicle details (VDP) page_view events across all sessions for the visitorsessions for the visitor`,
} ,
web_visitor_total_level_2_events:  {
  sql: `web_visitor_total_level_2_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 2 engagement events' according to the measurement framework`,
} ,
web_visitor_total_level_3_events:  {
  sql: `web_visitor_total_level_3_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 3 enquiry events' according to the measurement framework (i.e. number of enquiry form submits)`,
} ,
web_visitor_total_level_4_events:  {
  sql: `web_visitor_total_level_4_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 4 transaction events' according to the measurement framework (i.e. number of completed transactions)`,
} ,
web_visitor_total_level_2_vdp:  {
  sql: `web_visitor_total_level_2_vdp`,
  type: `int64`,
  description: `Number of Vehicle Detail Pages (VDPs) visited by the visitor with at least one 'level 2 engagement event' fired from that VDP i.e. Reflects the number of vehicles that the visitor 'engaged' with according to the measurement framework`,
} ,
web_visitor_first_session_start_date:  {
  sql: `web_visitor_first_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s first session`,
} ,
web_visitor_first_session_start_timestamp:  {
  sql: `web_visitor_first_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s first session`,
} ,
web_visitor_last_session_start_date:  {
  sql: `web_visitor_last_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s last session`,
} ,
web_visitor_last_session_start_timestamp:  {
  sql: `web_visitor_last_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s last session`,
} ,
web_visitor_first_not_null_intent:  {
  sql: `web_visitor_first_not_null_intent`,
  type: `string`,
  description: `The first not-null intent for the visitor (across all of their sessions)`,
} ,
web_visitor_first_non_other_intent:  {
  sql: `web_visitor_first_non_other_intent`,
  type: `string`,
  description: `The first non-other intent for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_intent:  {
  sql: `web_visitor_last_not_null_intent`,
  type: `string`,
  description: `The last intent for the visitor (across all of their sessions)`,
} ,
web_visitor_intent:  {
  sql: `web_visitor_intent`,
  type: `string`,
  description: `The ‘best’ and ‘highest’ intent for the visitor (across all of their sessions)`,
} ,
web_visitor_mf_level:  {
  sql: `web_visitor_mf_level`,
  type: `string`,
  description: `The measurement framework level reached by the visitor for their 'best' intent (across all of their sessions)`,
} ,
web_visitor_first_not_null_channel:  {
  sql: `web_visitor_first_not_null_channel`,
  type: `string`,
  description: `The first not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_source:  {
  sql: `web_visitor_first_not_null_source`,
  type: `string`,
  description: `The first not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_medium:  {
  sql: `web_visitor_first_not_null_medium`,
  type: `string`,
  description: `The first not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_campaign:  {
  sql: `web_visitor_first_not_null_campaign`,
  type: `string`,
  description: `The first not-null campaign for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_channel:  {
  sql: `web_visitor_last_not_null_channel`,
  type: `string`,
  description: `The last not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_source:  {
  sql: `web_visitor_last_not_null_source`,
  type: `string`,
  description: `The last not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_medium:  {
  sql: `web_visitor_last_not_null_medium`,
  type: `string`,
  description: `The last not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_campaign:  {
  sql: `web_visitor_last_not_null_campaign`,
  type: `string`,
  description: `The last not-null campaign for the visitor (across all of their sessions)`,
} ,
} ,
measures: {
count_of_web_visitor_pk:  {
  sql: `web_visitor_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_sessions_xa`, {
sql: `select * from analytics_qa.wh_marketing__web_sessions_xa`,
joins : {
wh_marketing__web_events_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_session_pk} = ${wh_marketing__web_events_fact.web_session_fk}`,
} ,
}, 
dimensions: {
web_session_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_session_pk`,
  description: `Primary key of the sessions table (Unique ID for a session)`,
} ,
web_visitor_fk:  {
  sql: `web_visitor_fk`,
  type: `string`,
  description: `Primary key of the visitors table (Unique ID for the visitor who conducted this session)`,
} ,
web_event_user_natural_key:  {
  sql: `web_event_user_natural_key`,
  type: `string`,
  description: `User ID from the raw GA data. This provides the 'known user ID' from our website, where it is set via the setUserId API via Google Analytics (GA). Customer accounts are not yet active on our websites so this column is not yet in use and will therefore be NULL for all records.`,
} ,
web_event_visitor_natural_key:  {
  sql: `web_event_visitor_natural_key`,
  type: `string`,
  description: `Visitor ID from the raw GA data. This provides the 'GA Client ID' from Google Analytics (GA) which is supplied in the user_pseudo_id column in the raw GA data. This is merely a GA cookie ID, which identifies an anonymous visitor to our website, which is unique to the visitor's device and browser.`,
} ,
web_event_session_natural_key:  {
  sql: `web_event_session_natural_key`,
  type: `string`,
  description: `Session ID from the raw GA data (which comes through as an event parameter called 'ga_session_id')`,
} ,
web_session_compound_key:  {
  sql: `web_session_compound_key`,
  type: `string`,
  description: `The generated unique identifier of a session within dbt.`,
} ,
web_session_wh_generated:  {
  sql: `web_session_wh_generated`,
  type: `int64`,
  description: `Flag to identify whether the session has been generated by the warehouse (with data value = 1) as opposed to identifying a session that came through in the GA clickstream data (with data value = 0)`,
} ,
web_session_data_source:  {
  sql: `web_session_data_source`,
  type: `string`,
  description: `The data source that has provided the session e.g. Data value will be 'ga4' for records coming from Google Analytics (GA)`,
} ,
web_session_website_property:  {
  sql: `web_session_website_property`,
  type: `string`,
  description: `The website related to the data source`,
} ,
web_session_number:  {
  sql: `web_session_number`,
  type: `int64`,
  description: `Ordinal session count for this visitor e.g. For the visitor's first session, the data value will be 1. For the visitor's second session, the data value will be 2.`,
} ,
web_session_ga_engaged_session:  {
  sql: `web_session_ga_engaged_session`,
  type: `int64`,
  description: `A data value of 'true' in this column indicates that Google Analytics (GA) has deemed the session to be an 'engaged session' (because it has one or more events that were deemed to be an 'engaged event'). Where GA's definition of 'engagement' is as follows: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_session_total_events:  {
  sql: `web_session_total_events`,
  type: `int64`,
  description: `Total number of events within the session`,
} ,
web_session_total_ga_engaged_events:  {
  sql: `web_session_total_ga_engaged_events`,
  type: `int64`,
  description: `Total number of events within the session that Google Analytics (GA) deemed to be an 'engaged event'. Where GA's definition of 'engagement' is as follows: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_session_total_page_views:  {
  sql: `web_session_total_page_views`,
  type: `int64`,
  description: `Total number of page_view events within the session`,
} ,
web_session_total_search_results_page_views:  {
  sql: `web_session_total_search_results_page_views`,
  type: `int64`,
  description: `Total number of search result (SRP) page_view events within the session`,
} ,
web_session_total_vehicle_details_page_views:  {
  sql: `web_session_total_vehicle_details_page_views`,
  type: `int64`,
  description: `Total number of vehicle details (VDP) page_view events within the session`,
} ,
web_session_total_level_2_events:  {
  sql: `web_session_total_level_2_events`,
  type: `int64`,
  description: `Total number of events within the session that were 'level 2 engagement events' according to the measurement framework`,
} ,
web_session_total_level_3_events:  {
  sql: `web_session_total_level_3_events`,
  type: `int64`,
  description: `Total number of events within the session that were 'level 3 enquiry events' according to the measurement framework (i.e. number of enquiry form submits)`,
} ,
web_session_total_level_4_events:  {
  sql: `web_session_total_level_4_events`,
  type: `int64`,
  description: `Total number of events within the session that were 'level 4 transaction events' according to the measurement framework (i.e. number of completed transactions)`,
} ,
web_session_total_level_2_vdp:  {
  sql: `web_session_total_level_2_vdp`,
  type: `int64`,
  description: `Number of Vehicle Detail Pages (VDPs) visited by the session with at least one 'level 2 engagement event' fired from that VDP i.e. Reflects the number of vehicles that the session 'engaged' with according to the measurement framework`,
} ,
web_session_total_intents:  {
  sql: `web_session_total_intents`,
  type: `int64`,
  description: `The number of different intents exhibited by the session`,
} ,
web_session_landing_page_hostname:  {
  sql: `web_session_landing_page_hostname`,
  type: `string`,
  description: `The hostname of the first page_view event in the session`,
} ,
web_session_landing_page_type:  {
  sql: `web_session_landing_page_type`,
  type: `string`,
  description: `The type of the first page_view event in the session`,
} ,
web_session_landing_page_title:  {
  sql: `web_session_landing_page_title`,
  type: `string`,
  description: `The title of the first page_view event in the session`,
} ,
web_session_landing_page_referrer:  {
  sql: `web_session_landing_page_referrer`,
  type: `string`,
  description: `The referrer of the first page_view event in the session`,
} ,
web_session_landing_page_referrer_ignore:  {
  sql: `web_session_landing_page_referrer_ignore`,
  type: `string`,
  description: `The referrer_ignore of the first page_view event in the session`,
} ,
web_session_landing_page_location:  {
  sql: `web_session_landing_page_location`,
  type: `string`,
  description: `The location of the first page_view event in the session`,
} ,
web_session_landing_page_location_without_query_parameters:  {
  sql: `web_session_landing_page_location_without_query_parameters`,
  type: `string`,
  description: `The location of the first page_view event in the session, excluding any query parameters`,
} ,
web_session_exit_page_hostname:  {
  sql: `web_session_exit_page_hostname`,
  type: `string`,
  description: `The hostname the last page_view event of in the session`,
} ,
web_session_exit_page_type:  {
  sql: `web_session_exit_page_type`,
  type: `string`,
  description: `The type the last page_view event of in the session`,
} ,
web_session_exit_page_location:  {
  sql: `web_session_exit_page_location`,
  type: `string`,
  description: `The location the last page_view event of in the session`,
} ,
web_session_exit_page_title:  {
  sql: `web_session_exit_page_title`,
  type: `string`,
  description: `The title the last page_view event of in the session`,
} ,
web_session_exit_page_referrer:  {
  sql: `web_session_exit_page_referrer`,
  type: `string`,
  description: `The referrer the last page_view event of in the session`,
} ,
web_session_exit_page_referrer_ignore:  {
  sql: `web_session_exit_page_referrer_ignore`,
  type: `string`,
  description: `The referrer_ignore the last page_view event of in the session`,
} ,
web_session_division:  {
  sql: `web_session_division`,
  type: `string`,
  description: `The division of the session`,
} ,
web_session_first_not_null_division:  {
  sql: `web_session_first_not_null_division`,
  type: `string`,
  description: `The division on the first event in the session`,
} ,
web_session_last_division:  {
  sql: `web_session_last_division`,
  type: `string`,
  description: `The division on the last event in the session`,
} ,
web_session_brand:  {
  sql: `web_session_brand`,
  type: `string`,
  description: `The brand of the session`,
} ,
web_session_first_not_null_brand:  {
  sql: `web_session_first_not_null_brand`,
  type: `string`,
  description: `The brand on the first event in the session`,
} ,
web_session_last_brand:  {
  sql: `web_session_last_brand`,
  type: `string`,
  description: `The brand on the last event in the session`,
} ,
web_session_highest_frequency_brand:  {
  sql: `web_session_highest_frequency_brand`,
  type: `string`,
  description: `The most frequent value of brand across all events for the session`,
} ,
web_session_intent:  {
  sql: `web_session_intent`,
  type: `string`,
  description: `The intent of the session`,
} ,
web_session_first_not_null_intent:  {
  sql: `web_session_first_not_null_intent`,
  type: `string`,
  description: `The first non-null intent in the session`,
} ,
web_session_first_non_other_intent:  {
  sql: `web_session_first_non_other_intent`,
  type: `string`,
  description: `The first non-other intent in the session`,
} ,
web_session_last_intent:  {
  sql: `web_session_last_intent`,
  type: `string`,
  description: `The intent on the last event in the session`,
} ,
web_session_mf_level:  {
  sql: `web_session_mf_level`,
  type: `string`,
  description: `The measurement framework level assigned to the session`,
} ,
web_session_mf_sub_level:  {
  sql: `web_session_mf_sub_level`,
  type: `string`,
  description: `The measurement framework sub-level assigned to the session`,
} ,
web_session_start_channel:  {
  sql: `web_session_start_channel`,
  type: `string`,
  description: `The channel of the session_start event`,
} ,
web_session_start_source:  {
  sql: `web_session_start_source`,
  type: `string`,
  description: `The source of the session_start event`,
} ,
web_session_start_medium:  {
  sql: `web_session_start_medium`,
  type: `string`,
  description: `The medium of the session_start event`,
} ,
web_session_start_campaign:  {
  sql: `web_session_start_campaign`,
  type: `string`,
  description: `The campaign of the session_start event`,
} ,
web_session_start_content:  {
  sql: `web_session_start_content`,
  type: `string`,
  description: `The content of the session_start event`,
} ,
web_session_start_term:  {
  sql: `web_session_start_term`,
  type: `string`,
  description: `The term of the session_start event`,
} ,
web_session_first_channel:  {
  sql: `web_session_first_channel`,
  type: `string`,
  description: `The channel on the first event in the session`,
} ,
web_session_first_source:  {
  sql: `web_session_first_source`,
  type: `string`,
  description: `The source on the first event in the session`,
} ,
web_session_first_medium:  {
  sql: `web_session_first_medium`,
  type: `string`,
  description: `The medium on the first event in the session`,
} ,
web_session_first_campaign:  {
  sql: `web_session_first_campaign`,
  type: `string`,
  description: `The campaign on the first event in the session`,
} ,
web_session_first_content:  {
  sql: `web_session_first_content`,
  type: `string`,
  description: `The content on the first event in the session`,
} ,
web_session_first_term:  {
  sql: `web_session_first_term`,
  type: `string`,
  description: `The term on the first event in the session`,
} ,
web_session_first_not_null_channel:  {
  sql: `web_session_first_not_null_channel`,
  type: `string`,
  description: `The first non-null channel in the session`,
} ,
web_session_first_not_null_source:  {
  sql: `web_session_first_not_null_source`,
  type: `string`,
  description: `The first non-null source in the session`,
} ,
web_session_first_not_null_medium:  {
  sql: `web_session_first_not_null_medium`,
  type: `string`,
  description: `The first non-null medium in the session`,
} ,
web_session_first_not_null_campaign:  {
  sql: `web_session_first_not_null_campaign`,
  type: `string`,
  description: `The first non-null campaign in the session`,
} ,
web_session_first_not_null_content:  {
  sql: `web_session_first_not_null_content`,
  type: `string`,
  description: `The first non-null content in the session`,
} ,
web_session_first_not_null_term:  {
  sql: `web_session_first_not_null_term`,
  type: `string`,
  description: `The first non-null term in the session`,
} ,
web_session_last_channel:  {
  sql: `web_session_last_channel`,
  type: `string`,
  description: `The channel on the last event in the session`,
} ,
web_session_last_source:  {
  sql: `web_session_last_source`,
  type: `string`,
  description: `The source on the last event in the session`,
} ,
web_session_last_medium:  {
  sql: `web_session_last_medium`,
  type: `string`,
  description: `The medium on the last event in the session`,
} ,
web_session_last_campaign:  {
  sql: `web_session_last_campaign`,
  type: `string`,
  description: `The campaign on the last event in the session`,
} ,
web_session_last_content:  {
  sql: `web_session_last_content`,
  type: `string`,
  description: `The content on the last event in the session`,
} ,
web_session_last_term:  {
  sql: `web_session_last_term`,
  type: `string`,
  description: `The term on the last event in the session`,
} ,
web_session_first_not_null_device_category:  {
  sql: `web_session_first_not_null_device_category`,
  type: `string`,
  description: `The first non-null device_category in the session`,
} ,
web_session_first_not_null_device_mobile_brand_name:  {
  sql: `web_session_first_not_null_device_mobile_brand_name`,
  type: `string`,
  description: `The first non-null device_mobile_brand_name in the session`,
} ,
web_session_first_not_null_device_mobile_model_name:  {
  sql: `web_session_first_not_null_device_mobile_model_name`,
  type: `string`,
  description: `The first non-null device_mobile_model_name in the session`,
} ,
web_session_first_not_null_device_mobile_marketing_name:  {
  sql: `web_session_first_not_null_device_mobile_marketing_name`,
  type: `string`,
  description: `The first non-null device_mobile_marketing_name in the session`,
} ,
web_session_first_not_null_device_mobile_os_hardware_model:  {
  sql: `web_session_first_not_null_device_mobile_os_hardware_model`,
  type: `string`,
  description: `The first non-null device_mobile_os_hardware_model in the session`,
} ,
web_session_first_not_null_device_operating_system:  {
  sql: `web_session_first_not_null_device_operating_system`,
  type: `string`,
  description: `The first non-null device_operating_system in the session`,
} ,
web_session_first_not_null_device_operating_system_version:  {
  sql: `web_session_first_not_null_device_operating_system_version`,
  type: `string`,
  description: `The first non-null device_operating_system_version in the session`,
} ,
web_session_first_not_null_device_vendor_id:  {
  sql: `web_session_first_not_null_device_vendor_id`,
  type: `string`,
  description: `The first non-null device_vendor_id in the session`,
} ,
web_session_first_not_null_device_advertising_id:  {
  sql: `web_session_first_not_null_device_advertising_id`,
  type: `string`,
  description: `The first non-null device_advertising_id in the session`,
} ,
web_session_first_not_null_device_language:  {
  sql: `web_session_first_not_null_device_language`,
  type: `string`,
  description: `The first non-null device_language in the session`,
} ,
web_session_first_not_null_device_time_zone_offset_seconds:  {
  sql: `web_session_first_not_null_device_time_zone_offset_seconds`,
  type: `int64`,
  description: `The first non-null device_time_zone_offset_seconds in the session`,
} ,
web_session_first_not_null_device_is_limited_ad_tracking:  {
  sql: `web_session_first_not_null_device_is_limited_ad_tracking`,
  type: `string`,
  description: `The first non-null device_is_limited_ad_tracking in the session`,
} ,
web_session_first_not_null_device_browser:  {
  sql: `web_session_first_not_null_device_browser`,
  type: `string`,
  description: `The first non-null device_browser in the session`,
} ,
web_session_first_not_null_device_browser_version:  {
  sql: `web_session_first_not_null_device_browser_version`,
  type: `string`,
  description: `The first non-null device_browser_version in the session`,
} ,
web_session_first_not_null_device_screen_resolution:  {
  sql: `web_session_first_not_null_device_screen_resolution`,
  type: `string`,
  description: `The first non-null device_screen_resolution in the session`,
} ,
web_session_first_not_null_geo_continent:  {
  sql: `web_session_first_not_null_geo_continent`,
  type: `string`,
  description: `The first non-null continent in the session`,
} ,
web_session_first_not_null_geo_sub_continent:  {
  sql: `web_session_first_not_null_geo_sub_continent`,
  type: `string`,
  description: `The first non-null sub_continent in the session`,
} ,
web_session_first_not_null_geo_country:  {
  sql: `web_session_first_not_null_geo_country`,
  type: `string`,
  description: `The first non-null country in the session`,
} ,
web_session_first_not_null_geo_region:  {
  sql: `web_session_first_not_null_geo_region`,
  type: `string`,
  description: `The first non-null region in the session`,
} ,
web_session_first_not_null_geo_metro:  {
  sql: `web_session_first_not_null_geo_metro`,
  type: `string`,
  description: `The first non-null metro in the session`,
} ,
web_session_first_not_null_geo_city:  {
  sql: `web_session_first_not_null_geo_city`,
  type: `string`,
  description: `The first non-null city in the session`,
} ,
web_session_first_not_null_privacy_info_ads_storage:  {
  sql: `web_session_first_not_null_privacy_info_ads_storage`,
  type: `string`,
  description: `The first non-null ads_storage in the session`,
} ,
web_session_first_not_null_privacy_info_analytics_storage:  {
  sql: `web_session_first_not_null_privacy_info_analytics_storage`,
  type: `string`,
  description: `The first non-null analytics_storage in the session`,
} ,
web_session_first_not_null_privacy_info_uses_transient_token:  {
  sql: `web_session_first_not_null_privacy_info_uses_transient_token`,
  type: `string`,
  description: `The first non-null uses_transient_token in the session`,
} ,
web_session_start_timestamp:  {
  sql: `web_session_start_timestamp`,
  type: `timestamp`,
  description: `The timestamp of the first event in the session`,
} ,
web_session_end_timestamp:  {
  sql: `web_session_end_timestamp`,
  type: `timestamp`,
  description: `The timestamp of the last event in the session`,
} ,
web_session_start_date:  {
  sql: `web_session_start_date`,
  type: `date`,
  description: `The date of the first event in the session - excluding timestamp`,
} ,
web_session_duration_seconds:  {
  sql: `web_session_duration_seconds`,
  type: `int64`,
  description: `Number of seconds between the timestamps for the first and last events in the session`,
} ,
} ,
measures: {
count_of_web_session_pk:  {
  sql: `web_session_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_visitors_xa`, {
sql: `select * from analytics_qa.wh_marketing__web_visitors_xa`,
joins : {
wh_marketing__web_sessions_xa:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_sessions_xa.web_visitor_fk}`,
} ,
wh_marketing__web_events_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_events_fact.web_visitor_fk}`,
} ,
}, 
dimensions: {
web_visitor_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_visitor_pk`,
  description: `Primary key of the visitors table (surrogate key of web_event_visitor_natural_key)`,
} ,
web_event_user_natural_key:  {
  sql: `web_event_user_natural_key`,
  type: `string`,
  description: `User ID from the raw GA data. This provides the 'known user ID' from our website, where it is set via the setUserId API via Google Analytics (GA). Customer accounts are not yet active on our websites so this column is not yet in use and will therefore be NULL for all records.`,
} ,
web_event_visitor_natural_key:  {
  sql: `web_event_visitor_natural_key`,
  type: `string`,
  description: `Visitor ID from the raw GA data. This provides the 'GA Client ID' from Google Analytics (GA) which is supplied in the user_pseudo_id column in the raw GA data. This is merely a GA cookie ID, which identifies an anonymous visitor to our website, which is unique to the visitor's device and browser.`,
} ,
web_visitor_wh_generated:  {
  sql: `web_visitor_wh_generated`,
  type: `int64`,
  description: `Flag to identify whether the visitor has been generated by the warehouse (with data value = 1) as opposed to identifying a visitor that came through in the GA clickstream data (with data value = 0)`,
} ,
web_visitor_data_source:  {
  sql: `web_visitor_data_source`,
  type: `string`,
  description: `The data source that has provided the session e.g. Data value will be 'ga4' for records coming from Google Analytics (GA)`,
} ,
web_visitor_website_property:  {
  sql: `web_visitor_website_property`,
  type: `string`,
  description: `The website related to the data source`,
} ,
web_visitor_total_sessions:  {
  sql: `web_visitor_total_sessions`,
  type: `int64`,
  description: `Total number of sessions for the visitor`,
} ,
web_visitor_total_events:  {
  sql: `web_visitor_total_events`,
  type: `int64`,
  description: `Total number of events (across all sessions) for the visitor`,
} ,
web_visitor_ga_engaged_visitor:  {
  sql: `web_visitor_ga_engaged_visitor`,
  type: `int64`,
  description: `A data value of 'true' in this column indicates that Google Analytics (GA) has deemed the visitor to be an 'engaged visitor' (because it has one or more events that were deemed to be an 'engaged event'). Where GA's definition of 'engagement' is as follows: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_visitor_total_page_views:  {
  sql: `web_visitor_total_page_views`,
  type: `int64`,
  description: `Total number of page_view events across all sessions for the visitor`,
} ,
web_visitor_total_search_results_page_views:  {
  sql: `web_visitor_total_search_results_page_views`,
  type: `int64`,
  description: `Total number of search result (SRP) page_view events across all sessions for the visitorfor the visitor`,
} ,
web_visitor_total_vehicle_details_page_views:  {
  sql: `web_visitor_total_vehicle_details_page_views`,
  type: `int64`,
  description: `Total number of vehicle details (VDP) page_view events across all sessions for the visitorsessions for the visitor`,
} ,
web_visitor_total_level_2_events:  {
  sql: `web_visitor_total_level_2_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 2 engagement events' according to the measurement framework`,
} ,
web_visitor_total_level_3_events:  {
  sql: `web_visitor_total_level_3_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 3 enquiry events' according to the measurement framework (i.e. number of enquiry form submits)`,
} ,
web_visitor_total_level_4_events:  {
  sql: `web_visitor_total_level_4_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 4 transaction events' according to the measurement framework (i.e. number of completed transactions)`,
} ,
web_visitor_total_level_2_vdp:  {
  sql: `web_visitor_total_level_2_vdp`,
  type: `int64`,
  description: `Number of Vehicle Detail Pages (VDPs) visited by the visitor with at least one 'level 2 engagement event' fired from that VDP i.e. Reflects the number of vehicles that the visitor 'engaged' with according to the measurement framework`,
} ,
web_visitor_first_session_start_date:  {
  sql: `web_visitor_first_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s first session`,
} ,
web_visitor_first_session_start_timestamp:  {
  sql: `web_visitor_first_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s first session`,
} ,
web_visitor_last_session_start_date:  {
  sql: `web_visitor_last_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s last session`,
} ,
web_visitor_last_session_start_timestamp:  {
  sql: `web_visitor_last_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s last session`,
} ,
web_visitor_first_not_null_intent:  {
  sql: `web_visitor_first_not_null_intent`,
  type: `string`,
  description: `The first not-null intent for the visitor (across all of their sessions)`,
} ,
web_visitor_first_non_other_intent:  {
  sql: `web_visitor_first_non_other_intent`,
  type: `string`,
  description: `The first non-other intent for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_intent:  {
  sql: `web_visitor_last_not_null_intent`,
  type: `string`,
  description: `The last intent for the visitor (across all of their sessions)`,
} ,
web_visitor_intent:  {
  sql: `web_visitor_intent`,
  type: `string`,
  description: `The ‘best’ and ‘highest’ intent for the visitor (across all of their sessions)`,
} ,
web_visitor_mf_level:  {
  sql: `web_visitor_mf_level`,
  type: `string`,
  description: `The measurement framework level reached by the visitor for their 'best' intent (across all of their sessions)`,
} ,
web_visitor_first_not_null_channel:  {
  sql: `web_visitor_first_not_null_channel`,
  type: `string`,
  description: `The first not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_source:  {
  sql: `web_visitor_first_not_null_source`,
  type: `string`,
  description: `The first not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_medium:  {
  sql: `web_visitor_first_not_null_medium`,
  type: `string`,
  description: `The first not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_campaign:  {
  sql: `web_visitor_first_not_null_campaign`,
  type: `string`,
  description: `The first not-null campaign for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_channel:  {
  sql: `web_visitor_last_not_null_channel`,
  type: `string`,
  description: `The last not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_source:  {
  sql: `web_visitor_last_not_null_source`,
  type: `string`,
  description: `The last not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_medium:  {
  sql: `web_visitor_last_not_null_medium`,
  type: `string`,
  description: `The last not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_campaign:  {
  sql: `web_visitor_last_not_null_campaign`,
  type: `string`,
  description: `The last not-null campaign for the visitor (across all of their sessions)`,
} ,
} ,
measures: {
count_of_web_visitor_pk:  {
  sql: `web_visitor_pk`,
  type: `count`,
} ,
}});
cube (`wh_marketing__web_visitors_xa`, {
sql: `select * from analytics_qa.wh_marketing__web_visitors_xa`,
joins : {
wh_marketing__web_sessions_xa:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_sessions_xa.web_visitor_fk}`,
} ,
wh_marketing__web_events_fact:  {
  relationship: `hasMany`,
  sql: `${CUBE.web_visitor_pk} = ${wh_marketing__web_events_fact.web_visitor_fk}`,
} ,
}, 
dimensions: {
web_visitor_pk:  {
  primaryKey: true,
  type: `string`,
  sql: `web_visitor_pk`,
  description: `Primary key of the visitors table (surrogate key of web_event_visitor_natural_key)`,
} ,
web_event_user_natural_key:  {
  sql: `web_event_user_natural_key`,
  type: `string`,
  description: `User ID from the raw GA data. This provides the 'known user ID' from our website, where it is set via the setUserId API via Google Analytics (GA). Customer accounts are not yet active on our websites so this column is not yet in use and will therefore be NULL for all records.`,
} ,
web_event_visitor_natural_key:  {
  sql: `web_event_visitor_natural_key`,
  type: `string`,
  description: `Visitor ID from the raw GA data. This provides the 'GA Client ID' from Google Analytics (GA) which is supplied in the user_pseudo_id column in the raw GA data. This is merely a GA cookie ID, which identifies an anonymous visitor to our website, which is unique to the visitor's device and browser.`,
} ,
web_visitor_wh_generated:  {
  sql: `web_visitor_wh_generated`,
  type: `int64`,
  description: `Flag to identify whether the visitor has been generated by the warehouse (with data value = 1) as opposed to identifying a visitor that came through in the GA clickstream data (with data value = 0)`,
} ,
web_visitor_data_source:  {
  sql: `web_visitor_data_source`,
  type: `string`,
  description: `The data source that has provided the session e.g. Data value will be 'ga4' for records coming from Google Analytics (GA)`,
} ,
web_visitor_website_property:  {
  sql: `web_visitor_website_property`,
  type: `string`,
  description: `The website related to the data source`,
} ,
web_visitor_total_sessions:  {
  sql: `web_visitor_total_sessions`,
  type: `int64`,
  description: `Total number of sessions for the visitor`,
} ,
web_visitor_total_events:  {
  sql: `web_visitor_total_events`,
  type: `int64`,
  description: `Total number of events (across all sessions) for the visitor`,
} ,
web_visitor_ga_engaged_visitor:  {
  sql: `web_visitor_ga_engaged_visitor`,
  type: `int64`,
  description: `A data value of 'true' in this column indicates that Google Analytics (GA) has deemed the visitor to be an 'engaged visitor' (because it has one or more events that were deemed to be an 'engaged event'). Where GA's definition of 'engagement' is as follows: The session lasted longer than 10 seconds, had a conversion event, or had 2 or more screen views or page views. Note: GA's definition of an 'engaged session' is different to our definition of an 'engaged session'.`,
} ,
web_visitor_total_page_views:  {
  sql: `web_visitor_total_page_views`,
  type: `int64`,
  description: `Total number of page_view events across all sessions for the visitor`,
} ,
web_visitor_total_search_results_page_views:  {
  sql: `web_visitor_total_search_results_page_views`,
  type: `int64`,
  description: `Total number of search result (SRP) page_view events across all sessions for the visitorfor the visitor`,
} ,
web_visitor_total_vehicle_details_page_views:  {
  sql: `web_visitor_total_vehicle_details_page_views`,
  type: `int64`,
  description: `Total number of vehicle details (VDP) page_view events across all sessions for the visitorsessions for the visitor`,
} ,
web_visitor_total_level_2_events:  {
  sql: `web_visitor_total_level_2_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 2 engagement events' according to the measurement framework`,
} ,
web_visitor_total_level_3_events:  {
  sql: `web_visitor_total_level_3_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 3 enquiry events' according to the measurement framework (i.e. number of enquiry form submits)`,
} ,
web_visitor_total_level_4_events:  {
  sql: `web_visitor_total_level_4_events`,
  type: `int64`,
  description: `Total number of events across all sessions for the visitor that were 'level 4 transaction events' according to the measurement framework (i.e. number of completed transactions)`,
} ,
web_visitor_total_level_2_vdp:  {
  sql: `web_visitor_total_level_2_vdp`,
  type: `int64`,
  description: `Number of Vehicle Detail Pages (VDPs) visited by the visitor with at least one 'level 2 engagement event' fired from that VDP i.e. Reflects the number of vehicles that the visitor 'engaged' with according to the measurement framework`,
} ,
web_visitor_first_session_start_date:  {
  sql: `web_visitor_first_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s first session`,
} ,
web_visitor_first_session_start_timestamp:  {
  sql: `web_visitor_first_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s first session`,
} ,
web_visitor_last_session_start_date:  {
  sql: `web_visitor_last_session_start_date`,
  type: `date`,
  description: `Date for the visitor’s last session`,
} ,
web_visitor_last_session_start_timestamp:  {
  sql: `web_visitor_last_session_start_timestamp`,
  type: `timestamp`,
  description: `Date and time for the visitor’s last session`,
} ,
web_visitor_first_not_null_intent:  {
  sql: `web_visitor_first_not_null_intent`,
  type: `string`,
  description: `The first not-null intent for the visitor (across all of their sessions)`,
} ,
web_visitor_first_non_other_intent:  {
  sql: `web_visitor_first_non_other_intent`,
  type: `string`,
  description: `The first non-other intent for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_intent:  {
  sql: `web_visitor_last_not_null_intent`,
  type: `string`,
  description: `The last intent for the visitor (across all of their sessions)`,
} ,
web_visitor_intent:  {
  sql: `web_visitor_intent`,
  type: `string`,
  description: `The ‘best’ and ‘highest’ intent for the visitor (across all of their sessions)`,
} ,
web_visitor_mf_level:  {
  sql: `web_visitor_mf_level`,
  type: `string`,
  description: `The measurement framework level reached by the visitor for their 'best' intent (across all of their sessions)`,
} ,
web_visitor_first_not_null_channel:  {
  sql: `web_visitor_first_not_null_channel`,
  type: `string`,
  description: `The first not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_source:  {
  sql: `web_visitor_first_not_null_source`,
  type: `string`,
  description: `The first not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_medium:  {
  sql: `web_visitor_first_not_null_medium`,
  type: `string`,
  description: `The first not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_first_not_null_campaign:  {
  sql: `web_visitor_first_not_null_campaign`,
  type: `string`,
  description: `The first not-null campaign for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_channel:  {
  sql: `web_visitor_last_not_null_channel`,
  type: `string`,
  description: `The last not-null channel for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_source:  {
  sql: `web_visitor_last_not_null_source`,
  type: `string`,
  description: `The last not-null source for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_medium:  {
  sql: `web_visitor_last_not_null_medium`,
  type: `string`,
  description: `The last not-null medium for the visitor (across all of their sessions)`,
} ,
web_visitor_last_not_null_campaign:  {
  sql: `web_visitor_last_not_null_campaign`,
  type: `string`,
  description: `The last not-null campaign for the visitor (across all of their sessions)`,
} ,
} ,
measures: {
count_of_web_visitor_pk:  {
  sql: `web_visitor_pk`,
  type: `count`,
} ,
}});
