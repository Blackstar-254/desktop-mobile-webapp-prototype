package gin_server

import "time"

type BannedItemT struct {
	IsBanned bool          `json:"isBanned"`
	Time     time.Time     `json:"time"`
	Duration time.Duration `json:"duration"`
}
type UaItem struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}
type CPUItem struct {
	Architectur string `json:"architecture"`
}
type UserAgentT struct {
	UA      string         `json:"ua"`
	Browser UaItem         `json:"browser"`
	Engine  UaItem         `json:"engine"`
	OS      UaItem         `json:"os"`
	Device  map[string]any `json:"device"`
	CPU     CPUItem        `json:"cpu"`
	IsBot   bool           `json:"isBot"`
	RestAnyMap
}

type RestMap = map[string]string
type HeadersItem struct {
	Accept          string `json:"accept"`
	AcceptEncoding  string `json:"accept-encoding"`
	AcceptLanguage  string `json:"accept-language"`
	CacheControl    string `json:"cache-control"`
	Connection      string `json:"connection"`
	Cookie          string `json:"cookie"`
	Host            string `json:"host"`
	Pragma          string `json:"pragma"`
	Referer         string `json:"referer"`
	SecChUA         string `json:"sec-ch-ua"`
	SecChUAMobile   string `json:"sec-ch-ua-mobile"`
	SecChUAPlatform string `json:"sec-ch-ua-platform"`
	SecFetchDest    string `json:"sec-fetch-dest"`
	SecFetchMode    string `json:"sec-fetch-mode"`
	SecFetcHSite    string `json:"sec-fetch-site"`
	SecGpc          string `json:"sec-gpc"`
	UserAgent       string `json:"user-agent"`
	XForwardedFor   string `json:"x-forwarded-for"`
	XForwardedHost  string `json:"x-forwarded-host"`
	XForwardedPort  string `json:"x-forwarded-port"`
	XForwardedProto string `json:"x-forwarded-proto"`
	RestMap
}

type CookiesItem struct {
	SessionId string `json:"sessionId"`
	UserId    string `json:"userId"`
	VisitorId string `json:"visitor-id"`
	RestMap
}

type GeoItem struct {
	City      string `json:"city"`
	Country   string `json:"country"`
	Region    string `json:"region"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

type RestAnyMap = map[string]any
type VisitorInfoT struct {
	UserAgent UserAgentT  `json:"ua"`
	Headers   HeadersItem `json:"headers"`
	Cookies   CookiesItem `json:"cookies"`
	Geo       GeoItem     `json:"geo"`
	Ip        string      `json:"ip"`
	Banned    BannedItemT `json:"banned"`
	RestAnyMap
}

func (vi *VisitorInfoT) VisitorId() string {
	return vi.Cookies.UserId
}
