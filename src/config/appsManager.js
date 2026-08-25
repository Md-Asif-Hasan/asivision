// Central Dynamic Apps Manager Store
// Supports custom apps, logos, Cloudflare image URLs, sectioned privacy policy forms, service accounts, and Cloud Firestore sync.

import { db } from "../lib/firestore";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

import { getAdminSettings } from "./adminSettings";

// ─── CLOUDFLARE R2 BUCKET CONFIGURATION ──────────────────────────────────────
export function getCloudflareR2Config() {
  const settings = getAdminSettings();
  return {
    bucketName: settings.cloudflare?.bucketName || "asivision-bucket",
    accountId: settings.cloudflare?.accountId || "ce183a072f5c0f81a67c9e948e3d3520",
    publicDevUrl: settings.cloudflare?.publicDevUrl || "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev",
    imagesFolder: settings.cloudflare?.imagesFolder || "/application-images/",
    imagesBaseUrl: settings.cloudflare?.imagesBaseUrl || "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/",
    s3ApiEndpoint: settings.cloudflare?.s3ApiEndpoint || "https://ce183a072f5c0f81a67c9e948e3d3520.r2.cloudflarestorage.com/asivision-bucket",
    accessKeyId: settings.cloudflare?.accessKeyId || "",
    secretAccessKey: settings.cloudflare?.secretAccessKey || ""
  };
}

export const CLOUDFLARE_R2_CONFIG = getCloudflareR2Config();

export const DEFAULT_SAAS_APPS = [
  {
    id: "mindforge_arena",
    name: "MindForge Arena Pro",
    category: "Cognitive Esports & IQ Games",
    description: "Pro assessments, unlimited multiplayer arena battles, and neural analytics.",
    icon: "🧠",
    logoUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/mindforge_arena_logo.png",
    previewImageUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/mindforge_arena_preview.png",
    linkUrl: "https://play.google.com/store/apps/details?id=com.devstudio.iqpro",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.devstudio.iqpro",
    effectiveDate: "August 20, 2026",
    disclaimers: "MindForge Arena Pro is a cognitive esports and brain assessment platform. Scores and neural analytics are for educational and training purposes.",
    collectedInfo: "Account Details: Name, email, and user UID.\nAssessment Data: IQ test answers, reaction speeds, and multiplayer battle history.\nDevice Info: OS version and screen resolution for diagnostic compatibility.",
    howUsed: "Deliver real-time multiplayer arena matchmaking.\nSync cognitive progress across web and mobile devices.\nProvide analytical skill performance breakdowns.",
    storageSecurity: "Passwords are encrypted using bcrypt.\nSessions are secured with HttpOnly cookies and HTTPS/TLS encryption.\nAnalytics stored on secure cloud database servers.",
    userRights: "Users may request data deletion or account export at any time by contacting asifhasan10122000@gmail.com.",
    serviceAccountEmail: "gumroad-access@iq-test-pro-d5fb2.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCdaHkQaSNkJYtr\nPC1MSoVkyAJgbLdcpr1u6xR97KvYj2zpOs04e2txumcwA3mL+gbnNQCfzWHea8S9\nK1BNuq9ZKE3KZyJvoh4U1FWOlb83tyJYbX4jZ2ncqOe29vSDOv5HvuE4hd3zPH34\nbyCfTp22N3VXTTrvSvF1r+uEYvwgIxJuiLkkOgRhnoI+yjibWmBpEh4mf1/Yf3Xl\n5asgiZWtd2PvoFlCzQEILvqa6eN/CC/RZOCwKvXYFfybuqMjIjm252PSOs7xTNIn\nvwKY3N45U5D6WNaZRAfj9p/1nDI8sgmk/3FPPaQ0vb6RiSJK9F0KuboWIBcAKwP8\nU0PH72jHAgMBAAECggEADAfC5PMG05hzqOJPBfsracdIOI1mkDa62KzagpX25lTD\n5VQWAOCclshr1YVrzJEd5kgslYoRa6SUmJlPCGR3ErCGuCxHZf0fy8YUtJKTrD2b\nauMSFmueHCbD8D28n1ZVaS9YsES5m2WpV7ZKlH0M3F3YYoU9DAfldMdZZTiu01fW\n2MaUEbM6zTilFy5q9p9doW3h7eu8FFCV8XnNvdEt4wA/TW726C8IyLi1ZTIjpveo\nmITMUaV1E60ekiXpKxQVuc8Kzs/TqhHk4db9Deo8oIfURF02GEjUfOf6x+X3zvbn\nMr6Hj54NmeOI5tE5xRDr7cbu15h+pNCbD5FCQLpwNQKBgQDLO1WUaOjmSEE7oAf2\njV5aSlvrg8hNqr7P+Y6qPSMQJtyyenx4ofXH6cCwRwe/JaZCyqkaFn0mwubiMbei\nc811BirWAm/aPY68bEstqqMALXctphYu93BkJevc6nyGGl+0ro72tQSJCOcQ66/C\nsIrfeOv7t3OAw0zUeR2GjREvbQKBgQDGR0XOc+saPihV+HBbGKh43yolu2AtDSc0\nH9H85ULyhDzkMRdJfUNJqCVz+ntx3lzUJwGVOP/UHmY2Xa/MBFJ4SWvuUqKhq9FJ\nnRmT0l1pehtU2MFBRC43t+tG+xrqyhzLb5mu7DkG3dryuuzklZBcFSDtVpK2jq6K\naSuT2Uo0gwJ/UcSNqiiLjBuGI3c/vPMkAy/ny9o5vQX1v7eortXqRZVdNnIRoneH\na+egn0v00fNT8YuYfeaOdAn22wsl1zbAc1UH5xMT7brWsvjfRoBhFLE2QieQxVTI\n44JeY4P0lgAGgau52Yj7SidK0IQDM1HUjhUY3S3yStxJDTOtrXUUdQKBgH851Gz4\nrG6WW8NuOon5dIC6kYzMgpXlzrX/hPpFEYQTng6+ATdCjR6CKiYVH4idKetna/iY\nLm+pYeSYkOjUDSbp1buCgqBCY3RcvcDARvgbRdZXjwmV+iH+fZV6IndtYLSY04AO\nSzlAufDuSHsUDSFI3WvtFQ7W1uAxQ6kG0DqJAoGAYcbPer8rAidIzdEsjJKa+jrE\n19JgAgL+z5YPVIJm6KMNmIZ75DJBwAPA2y/1o70hWKL8YjW7W9BzjMeQF6PLNsm4\nFzInd7YXe3zhWU24o1567X5LlydN+jY2zv5qJWVubfYsBGiiPjP43/nG86dmNelf\n8sfPR8KBaXrRjgkfEeY=\n-----END PRIVATE KEY-----\n",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "eternora",
    name: "Eternora Life Simulator Pro",
    category: "Metaverse & Legacy Simulator",
    description: "Unlimited life choices, family legacies, ad-free experience, and AI assistant.",
    icon: "🌐",
    logoUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/eternora_logo.png",
    previewImageUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/eternora_preview.png",
    linkUrl: "https://play.google.com/store/apps/details?id=com.Eternora.app&pli=1",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.Eternora.app&pli=1",
    effectiveDate: "August 20, 2026",
    disclaimers: "Eternora is an open-ended life simulation application. All story events, choices, and world generation are fictional.",
    collectedInfo: "Account Data: Email, username, and Pro entitlement status.\nSimulation State: Saved family tree legacies, story choices, and character attributes.",
    howUsed: "Generate personalized life simulation stories and legacy timelines.\nProvide an ad-free Pro user experience.",
    storageSecurity: "Encrypted HTTPS telemetry and secure cloud database backups.",
    userRights: "Request full account data wipe via support email: asifhasan10122000@gmail.com.",
    serviceAccountEmail: "gumroad-access@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4Pg88Ng3uaK5B\nTk9H9Q1+dZh2a4QdLS3lQwiIemf6gOjqV5oYlaWmXGwpk5VI9vwno3VhRW4QD8O1\nuuCssjXavUKyHWAoAJyGdYD4VJgirbBzWJ6AOjOWttUnz40gE1rXkBQ3Anf6JQax\nCMsCawKFrMOPvBts0Zqm5EdqkJXWioHYzUavggG80E1MpXYhJqg47ZozGyQ98zV3\nxueGfUJtmRka7Ni6Li3xtQ4MOmsBaVoel9ArzHVl+MXMhB0zIPt//S24cMhm/C2i\n82fALe1spL7NxVuwR0j0nhMZKM6IYWk5t5gF84695/xcb7GzgsijGnslBHIghVdz\ngS2El+7RAgMBAAECggEAFyE3YWw50IHUyn8Nxe9WO9eAhfFWeyE2X09MjXGshw7S\n7sSDpG15B8sXixqrhab4HfPP4x/Hwv1vqOtmlFelGipjap/0d+EnxVuQDtzz4nqi\nqcBo2Zk068lVNjPAuFOltmUwnH1TWZR3ZBdCATI09VosjOllGgKwYx5Kdu7i2LWA\n/U8WCodtMpfogSm104JBFwyOD6PHE/L01wkE5bPshFWKGicSB86pj/+Wi8FD6kNd\n5oegsBSTHLpRgAo3CaBAg+9yTu+5fbIixzvug6H/l0B053ncn7Tg+o5/H7btImcW\nHTK6hPAojW3tnbuqOJ9XZlW06mX3CtaAEuehlRRA3wKBgQDtFLjfYHG+BzgBFKJV\nysild1SnDxXS5LVY5Xgso1uNp/4bKdi3UdBQWOvfwEHkKcCf1WHLVAI51TNCMSXs\nbChBdWxaZC1Ctuo3Q+ftJtTGZcPZMzVn5QaVSQe7jtNqn3Yvn4PvUa40efvkyqNm\n6cTQQKF9puSbrBeanBOyvvHphwKBgQDG8ej0tUchB+gi3VIE5wzb/iyWeUQKBo1S\nG/sgLP0zgvB/l7XkfO2DR7HvuqNEEYJLnNELHyj08LOlmskdiZaB32EKZB2sQesl\no6Wxh+RqvcGjCPNctk/pUJd800gP53sN6GYq7nde2iGb1cahb1HIOnx/mPMIolZ3\nXUNdmFWa5wKBgG+FS+FnkJl+880uU55foTqUg3GCGxX1F4kViA4XWb2sxE8qxBKX\nnZHuAiZiXZxiN4X37eSjQ9jIfTApxlkMF3OTNMDgVpoHSO1uN+7KUVRyEkpdWEXi\n6dHXZJfJe5GwKPwF4R32Iif1KZRZ7bs/Q6FihZSBqQ/BR+kmee2e/FSJAoGAZ6nD\nzkbrMk3xasFSLJXMQJGX4Cx+BI9XchJ8b06h/QZclM+TiuSBymdAU3839Y7+CrJC\nxv3MlJ0brs4Rv59i2ndwFD8IqyqKAcnc273IisonrPFMBeJFj3hcB0H8ibT/jMas\n/e/WKYmV+6KP5qyfu6qmFsK22KfmUDo7kPiAmr8CgYADUOyGx0YmanQ0qiEHRTWV\nOO/KAzfNazquklpwUFhWci3zvy4BHSZWcGCtJAZxn2YnyqDmTSnBXt5KVDJXtS7c\nUnA6lMNN6DWf4s8vnNlsRqshvAMzvZKEB61ZzEkBbIPn1eKiem+vv0JL+G/pYQfR\n2kSEzcaYiEJFkLO/EAl/Bw==\n-----END PRIVATE KEY-----\n",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "taka_jachai",
    name: "Taka Jachai AI Vision",
    category: "Finance & Counterfeit Detection",
    description: "Computer vision counterfeit banknote detection and financial management.",
    icon: "⚡",
    logoUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/taka_jachai_logo.png",
    previewImageUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/taka_jachai_preview.png",
    linkUrl: "https://play.google.com/store/apps/details?id=com.takajachai.app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.takajachai.app",
    effectiveDate: "July 13, 2026",
    disclaimers: "TAKAJACHAI is NOT an official currency verification tool and is NOT affiliated with any government or central bank. Counterfeit detection is an AI aid and not 100% guaranteed.",
    collectedInfo: "Account Data: Business name, email, and authentication details.\nCamera Data: Banknote images captured solely for computer vision verification.\nBusiness Records: Sales logs and expense tracking data.",
    howUsed: "Process camera frames for real-time banknote feature verification.\nManage local business inventory and financial reporting.",
    storageSecurity: "Bcrypt hashed passwords, HttpOnly cookies, and HTTPS/TLS encrypted transmission.",
    userRights: "Camera permissions can be revoked at any time in device settings. Contact asifhasan10122000@gmail.com for account deletion.",
    serviceAccountEmail: "gumroad-access@apps-3000.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3KykozbsUNhBX\nGQ055Jal1rojIFfw2y703RaB+EE+mVsEs26t9QtFHlO/XeTAbj+OATbWcbNqqXDM\n/hG0pxYLAgxsWMDUYZMoiJCTPUqOhfBhetvUF6OrIzlxiXKxP356fNUHnK3Ufjs7\n3Ru5p+4vKFv1s+iI7Q06P8R8Jrd/fogpIjpe27pRVHKpD+rjbIYpUWuRuD+1VzSx\nH8paURuNdK4E3a/mbWCFaz1Hgw+QTvsZpJwSFIF1E7TJUkTRbTKrhxL2JVsqj8qm\nzkqcxJOyqJiTYIj7LS5XMPHvlyY5k/f/eD3sjMYRE1ahMj7rB49Z1rWXhy7cwR4n\n1Pwsxf+RAgMBAAECggEAAe76GgzDgWNP6T6oQOJko+i2jrGQ6OFd1CBG7fJLH56j\n/+wakMpTmlQt01XpzA1qrSFE84VZvOUZZFPEp627C6MaGUUXXzNa4VFBU9Yp/lBa\nb3AwXkNg0YKnemC82pm7Lqg4rqh88UKv3C7phwLHZROkMBDJG822ZDueFsCcRhBx\nGMJG8Kd6HsmrKyowmtKJbzqcnRI19RPfheINTSQ7/bJvsACXcv715Udh2KzEEJs2\n5fVc4eK+mrmmfVhwgc59HiYg3UKrtlaCl+SRWZ3Gw/hVg+UkAy23nSY2a4pGKTbZ\n1LJ5xKIUJ20L8DnmzSHM2l06/6LnNJ0jKKh/4lqk7QKBgQDY4XvUcmjWAwxTtjQG\noZaaSQLtOEEUGTnR7zOmkLGTOwRLS9yPsmz1GItygnasEmHRMioJVrQykRlm4uEA\nynf8Z63gTtkn2WGVVFV7SPXgVybwo7wdNT3wkgH3MigFj+78e7O+qG/SR26mDxwL\n12GZ5xuAzTdQT1KhqWE3cTCfswKBgQDYNQJbEdFDiE898khA1sPXiUECDmkZExx/\nV256FeCJwOzzLPLSpTuq6UGDQU5tfldUP3Qxdw4fuHCRB1Q8BF57YFM8NHVcKtXK\nvzTtTqdoerOntAsuTQdMGoHOy67i+tQvHmigdMtS/+Rs5hK1/NpKDfkXmw5a63H5\nkny+t9XhqwKBgQCBj9p45MwqJXIExFE6MOgWTU2ZR0Tha9x1xI83jzL2AIilLrGZ\nin66wKn1g2i/jM+wuGYSZCCMINBq/VhrL4kUWR+vY4so2h0Ip3PVjZWNKqNRmI71\nZ+wTvjW8ZdMw13ZukLulR1xd41x/iYE4tbdRyJVOkcnciTaU6unvxAfHLwKBgQCY\n0r9bh/iW956rdrpDuoqrq0TcIzt+kdeu2yon+ZbBSDE0oizxYAIRCNdZ46uAEbHA\nxylmXXUKTuCiYr/TvHLcWnX7NElQYKbFrOnIY7RJUZHzlHviumfSD1p5xddUcV/R\n/niOEoA1ptLbdrT7FkNl3QKZAOzgr1PcyQKL/H2eCQKBgD72GzC9RZbqMVMC5og0\np1UF6uZdVqpZ/rJXnvjEFsVE6UVwF00035mMJ8RvWwITAFq49q87HYWGG6L4M6gP\nnuG7OEzoCtl05E11P9QySPWK4vwg7wvVCV/AXj33kyVZ95XvvyQv9c5F6c3E/mL5\nU87E4UjoOCa0BNiaqE1ej9+D\n-----END PRIVATE KEY-----\n",
    isSaas: true,
    status: "Beta Pro Features"
  },
  {
    id: "ai_scrapers",
    name: "AI Automation Agents & Scrapers",
    category: "Cloud Automation Suite",
    description: "Autonomous web data extraction, multi-source scraping bots, and automated workflows.",
    icon: "🤖",
    logoUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/ai_scrapers_logo.png",
    previewImageUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/ai_scrapers_preview.png",
    linkUrl: "https://scrapers.asivision.com",
    effectiveDate: "August 20, 2026",
    disclaimers: "Scraping bots adhere strictly to target website terms of service and robots.txt protocols.",
    collectedInfo: "Scraping Jobs: Target URLs, extraction schemas, and API authentication keys.",
    howUsed: "Execute cloud data extraction pipelines and deliver automated reports.",
    storageSecurity: "API keys and pipeline outputs stored in encrypted Cloudflare R2 / KV databases.",
    userRights: "Full control to delete automation tasks via customer dashboard.",
    serviceAccountEmail: "gumroad-access@apps-3000.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3KykozbsUNhBX\nGQ055Jal1rojIFfw2y703RaB+EE+mVsEs26t9QtFHlO/XeTAbj+OATbWcbNqqXDM\n/hG0pxYLAgxsWMDUYZMoiJCTPUqOhfBhetvUF6OrIzlxiXKxP356fNUHnK3Ufjs7\n3Ru5p+4vKFv1s+iI7Q06P8R8Jrd/fogpIjpe27pRVHKpD+rjbIYpUWuRuD+1VzSx\nH8paURuNdK4E3a/mbWCFaz1Hgw+QTvsZpJwSFIF1E7TJUkTRbTKrhxL2JVsqj8qm\nzkqcxJOyqJiTYIj7LS5XMPHvlyY5k/f/eD3sjMYRE1ahMj7rB49Z1rWXhy7cwR4n\n1Pwsxf+RAgMBAAECggEAAe76GgzDgWNP6T6oQOJko+i2jrGQ6OFd1CBG7fJLH56j\n/+wakMpTmlQt01XpzA1qrSFE84VZvOUZZFPEp627C6MaGUUXXzNa4VFBU9Yp/lBa\nb3AwXkNg0YKnemC82pm7Lqg4rqh88UKv3C7phwLHZROkMBDJG822ZDueFsCcRhBx\nGMJG8Kd6HsmrKyowmtKJbzqcnRI19RPfheINTSQ7/bJvsACXcv715Udh2KzEEJs2\n5fVc4eK+mrmmfVhwgc59HiYg3UKrtlaCl+SRWZ3Gw/hVg+UkAy23nSY2a4pGKTbZ\n1LJ5xKIUJ20L8DnmzSHM2l06/6LnNJ0jKKh/4lqk7QKBgQDY4XvUcmjWAwxTtjQG\noZaaSQLtOEEUGTnR7zOmkLGTOwRLS9yPsmz1GItygnasEmHRMioJVrQykRlm4uEA\nynf8Z63gTtkn2WGVVFV7SPXgVybwo7wdNT3wkgH3MigFj+78e7O+qG/SR26mDxwL\n12GZ5xuAzTdQT1KhqWE3cTCfswKBgQDYNQJbEdFDiE898khA1sPXiUECDmkZExx/\nV256FeCJwOzzLPLSpTuq6UGDQU5tfldUP3Qxdw4fuHCRB1Q8BF57YFM8NHVcKtXK\nvzTtTqdoerOntAsuTQdMGoHOy67i+tQvHmigdMtS/+Rs5hK1/NpKDfkXmw5a63H5\nkny+t9XhqwKBgQCBj9p45MwqJXIExFE6MOgWTU2ZR0Tha9x1xI83jzL2AIilLrGZ\nin66wKn1g2i/jM+wuGYSZCCMINBq/VhrL4kUWR+vY4so2h0Ip3PVjZWNKqNRmI71\nZ+wTvjW8ZdMw13ZukLulR1xd41x/iYE4tbdRyJVOkcnciTaU6unvxAfHLwKBgQCY\n0r9bh/iW956rdrpDuoqrq0TcIzt+kdeu2yon+ZbBSDE0oizxYAIRCNdZ46uAEbHA\nxylmXXUKTuCiYr/TvHLcWnX7NElQYKbFrOnIY7RJUZHzlHviumfSD1p5xddUcV/R\n/niOEoA1ptLbdrT7FkNl3QKZAOzgr1PcyQKL/H2eCQKBgD72GzC9RZbqMVMC5og0\np1UF6uZdVqpZ/rJXnvjEFsVE6UVwF00035mMJ8RvWwITAFq49q87HYWGG6L4M6gP\nnuG7OEzoCtl05E11P9QySPWK4vwg7wvVCV/AXj33kyVZ95XvvyQv9c5F6c3E/mL5\nU87E4UjoOCa0BNiaqE1ej9+D\n-----END PRIVATE KEY-----\n",
    isSaas: true,
    status: "Incoming Pro Feature"
  }
];

const APPS_STORAGE_KEY = "asivision_custom_apps_v5";

// A policy page is available for every app ID. This keeps older saved apps and
// newly-created apps complete even if an editor leaves an optional field blank.
export function toPrivacySlug(value = "") {
  return String(value).trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

const PRIVACY_POLICY_DEFAULTS = {
  effectiveDate: "August 20, 2026",
  disclaimers: "This application is provided by Asivision Technology & Innovation. Please review this policy before using the service.",
  collectedInfo: "Account information needed to provide the service.\nDevice and diagnostic information needed to keep the application reliable.",
  howUsed: "Deliver the features and services you request.\nMaintain security, reliability, and support for the application.",
  storageSecurity: "Information is protected using reasonable technical and organizational safeguards.\nAccess is limited to authorized systems and personnel where required.",
  userRights: "You may request access, correction, export, or deletion of eligible personal information by contacting our privacy team."
};

export function withPrivacyPolicyDefaults(appData = {}) {
  return {
    ...PRIVACY_POLICY_DEFAULTS,
    ...appData,
    effectiveDate: appData.effectiveDate || PRIVACY_POLICY_DEFAULTS.effectiveDate,
    collectedInfo: appData.collectedInfo || PRIVACY_POLICY_DEFAULTS.collectedInfo,
    howUsed: appData.howUsed || PRIVACY_POLICY_DEFAULTS.howUsed,
    storageSecurity: appData.storageSecurity || PRIVACY_POLICY_DEFAULTS.storageSecurity,
    userRights: appData.userRights || PRIVACY_POLICY_DEFAULTS.userRights,
  };
}

// ─── CLOUD FIRESTORE SYNC HELPERS ─────────────────────────────────────────────

export async function syncAppToCloud(appData) {
  try {
    if (!db || !appData?.id) return;
    const ref = doc(db, "apps", appData.id);
    await setDoc(ref, {
      ...appData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Cloud Sync] App '${appData.id}' saved to Firestore.`);
  } catch (e) {
    console.error(`[Cloud Sync Error] Failed to save app '${appData?.id}' to Firestore:`, e);
  }
}

export async function deleteAppFromCloud(appId) {
  try {
    if (!db || !appId) return;
    const ref = doc(db, "apps", appId);
    await deleteDoc(ref);
    console.log(`[Cloud Sync] App '${appId}' deleted from Firestore.`);
  } catch (e) {
    console.error(`[Cloud Sync Error] Failed to delete app '${appId}' from Firestore:`, e);
  }
}

export async function fetchAppsFromCloud() {
  try {
    if (!db) return null;
    const snap = await getDocs(collection(db, "apps"));
    if (!snap.empty) {
      const cloudApps = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const current = getAppsList();
      const mergedMap = new Map();
      DEFAULT_SAAS_APPS.forEach(a => mergedMap.set(a.id, a));
      current.forEach(a => mergedMap.set(a.id, a));
      cloudApps.forEach(a => mergedMap.set(a.id, { ...mergedMap.get(a.id), ...a }));
      
      const merged = Array.from(mergedMap.values());
      if (typeof window !== "undefined") {
        localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event("asivision_apps_updated"));
      }
      return merged;
    }
  } catch (e) {
    console.warn("[Cloud Fetch] Could not load apps from Cloud Firestore (using local fallback):", e);
  }
  return null;
}

export function getAppsList() {
  if (typeof window === "undefined") return DEFAULT_SAAS_APPS;
  try {
    const raw = localStorage.getItem(APPS_STORAGE_KEY);
    if (!raw) {
      // Trigger background cloud sync on first load
      fetchAppsFromCloud();
      return DEFAULT_SAAS_APPS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(app => {
        const defaultApp = DEFAULT_SAAS_APPS.find(d => d.id === app.id);
        if (defaultApp && defaultApp.playStoreUrl) {
          return {
            ...app,
            playStoreUrl: defaultApp.playStoreUrl,
            linkUrl: defaultApp.linkUrl
          };
        }
        return app;
      });
    }
    return DEFAULT_SAAS_APPS;
  } catch (e) {
    console.error("Failed to parse stored apps:", e);
    return DEFAULT_SAAS_APPS;
  }
}

export function saveApp(appData) {
  if (typeof window === "undefined") return;
  try {
    const current = getAppsList();
    const existingIndex = current.findIndex(a => a.id === appData.id);
    let updated;
    const processedApp = withPrivacyPolicyDefaults(appData);
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...processedApp };
    } else {
      updated = [...current, processedApp];
    }
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_apps_updated"));

    // Sync saved app to Cloud Firestore
    syncAppToCloud(processedApp);

    return updated;
  } catch (e) {
    console.error("Failed to save app data:", e);
  }
}

export function deleteApp(appId) {
  if (typeof window === "undefined") return;
  try {
    const current = getAppsList();
    const updated = current.filter(a => a.id !== appId);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_apps_updated"));

    // Delete app from Cloud Firestore
    deleteAppFromCloud(appId);

    return updated;
  } catch (e) {
    console.error("Failed to delete app:", e);
  }
}

export function resetAppsList() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(APPS_STORAGE_KEY);
  window.dispatchEvent(new Event("asivision_apps_updated"));
  return DEFAULT_SAAS_APPS;
}
