#!/usr/bin/env node

/**
 * Script utilitaire pour récupérer le Company ID de votre page LinkedIn
 * Utilise l'API LinkedIn pour chercher votre entreprise
 */

import { LinkedInOAuthService } from "./dist/infrastructure/linkedin/oauth.service.js";
import { FileTokenStorage } from "./dist/infrastructure/storage/file-token-storage.js";
import axios from "axios";

async function getCompanyId() {
  console.log("🔍 Recherche du Company ID de GD Dev Solutions...\n");

  try {
    // Initialiser l'authentification
    const tokenStorage = new FileTokenStorage();
    const oauthService = new LinkedInOAuthService(tokenStorage);

    // Vérifier l'authentification
    const isAuthenticated = await oauthService.isAuthenticated();
    if (!isAuthenticated) {
      console.error("❌ Non authentifié. Veuillez d'abord lancer: npm start");
      process.exit(1);
    }

    // Récupérer le token
    const accessToken = await oauthService.getValidAccessToken();

    // Récupérer le profil pour avoir l'ID utilisateur
    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("✅ Profil récupéré:", profileResponse.data.name);
    console.log("");

    // Chercher les pages d'entreprise administrées par l'utilisateur
    console.log("🔍 Recherche des pages entreprise que vous administrez...\n");

    try {
      const companiesResponse = await axios.get(
        "https://api.linkedin.com/v2/organizationalEntityAcls",
        {
          params: {
            q: "roleAssignee",
            role: "ADMINISTRATOR",
            projection:
              "(elements*(organizationalTarget~(localizedName,vanityName)))",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      );

      if (
        companiesResponse.data.elements &&
        companiesResponse.data.elements.length > 0
      ) {
        console.log("📋 Pages entreprise trouvées:\n");

        companiesResponse.data.elements.forEach((element, index) => {
          const target = element["organizationalTarget~"];
          const orgUrn = element.organizationalTarget;

          // Extraire l'ID de l'URN (format: urn:li:organization:12345)
          const companyId = orgUrn.split(":").pop();

          console.log(`${index + 1}. ${target.localizedName}`);
          console.log(`   Vanity Name: ${target.vanityName || "N/A"}`);
          console.log(`   Company ID: ${companyId}`);
          console.log(`   URN: ${orgUrn}`);
          console.log("");
        });

        // Chercher GD Dev Solutions
        const gdDevSolutions = companiesResponse.data.elements.find(
          (element) => {
            const name = element["organizationalTarget~"]?.localizedName || "";
            const vanity = element["organizationalTarget~"]?.vanityName || "";
            return (
              name.toLowerCase().includes("gd dev") ||
              vanity.toLowerCase().includes("gd-dev")
            );
          }
        );

        if (gdDevSolutions) {
          const companyId = gdDevSolutions.organizationalTarget
            .split(":")
            .pop();
          console.log("🎯 GD Dev Solutions trouvée !");
          console.log("");
          console.log("Ajoutez cette ligne dans votre fichier .env :");
          console.log("");
          console.log(`LINKEDIN_COMPANY_ID=${companyId}`);
          console.log("");
        } else {
          console.log(
            "⚠️  GD Dev Solutions non trouvée dans vos pages administrées."
          );
          console.log(
            "Vérifiez que vous êtes bien administrateur de cette page."
          );
        }
      } else {
        console.log("⚠️  Aucune page entreprise trouvée.");
        console.log("Assurez-vous d'être administrateur de GD Dev Solutions.");
      }
    } catch (apiError) {
      if (apiError.response?.status === 403) {
        console.error(
          '❌ Accès refusé. Vous devez demander l\'accès au scope "r_organization_admin"'
        );
        console.error(
          "Allez sur LinkedIn Developer Portal > Products > Request access"
        );
      } else {
        console.error(
          "❌ Erreur API:",
          apiError.response?.data || apiError.message
        );
      }
    }
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
}

getCompanyId();
