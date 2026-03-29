import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Meta component for dynamic SEO and OpenGraph tags.
 * Props:
 * - title: Page title suffix
 * - description: Meta description
 * - ogTitle: OpenGraph title (defaults to title)
 * - ogDescription: OpenGraph description (defaults to description)
 * - image: Sharing image URL
 * - url: Canoncial URL
 */
const Meta = ({ 
    title, 
    description = "PAHRIKYNS - Professional DevOps, AWS, and Cloud Training Platform. Master production-grade skills with hands-on labs.",
    ogTitle,
    ogDescription,
    image = "https://pahrikyns.com/og-image.jpg", 
    url = "https://pahrikyns.com"
}) => {
    const fullTitle = title ? `${title} | PAHRIKYNS` : "PAHRIKYNS | Master DevOps & Cloud";
    
    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph (Facebook/LinkedIn) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ogTitle || fullTitle} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle || fullTitle} />
            <meta name="twitter:description" content={ogDescription || description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default Meta;
