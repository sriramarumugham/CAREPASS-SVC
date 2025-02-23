import { fetchProductsByIds } from '../data-access/product.repo';
import { CreateFormDataType } from '../domain/purchase/pruchase.request-schema';

export const validatePurchaseData = async (body: CreateFormDataType) => {
  const productIds = body?.formDetails?.map(
    (item) => item.userDetails.productId,
  );
  const products = await fetchProductsByIds(productIds!);

  let calculatedTotalPrice = 0;

  for (const item of body?.formDetails!) {
    const product = products.find(
      (p) => p.productId === item.userDetails.productId,
    );

    if (!product) {
      throw new Error(`Product ${item.userDetails.productId} not found`);
    }

    // Check price validation
    const itemTotalPrice = item.priceDetails.price;
    const productPrice = product.price;
    const beneficiaries = item.userDetails?.criticalIllnessBeneficiary || [];
    const superTopUpBeneficiary = item.userDetails?.superTopUpBeneficiary || [];
    const addedBeneficiaries = beneficiaries.length;

    // Calculate extra price based on beneficiaries
    const extraPriceWithBeneficiaries =
      addedBeneficiaries * product?.pricePerCriticalIllnessBeneficiary;

    const pricePerSuperTopupBeneficiary =
      product?.pricePerSuperTopupBeneficiary || 0;

    const extraPriceWithSupertopupBeneficiaries =
      superTopUpBeneficiary.length * pricePerSuperTopupBeneficiary;

    // Updated price validation logic
    const expectedTotalPrice =
      productPrice +
      extraPriceWithBeneficiaries +
      extraPriceWithSupertopupBeneficiaries;

    if (itemTotalPrice !== expectedTotalPrice) {
      throw new Error(
        `Price mismatch for product ${item.userDetails.productId}`,
      );
    }

    // Check maximum beneficiaries allowed
    // if (addedBeneficiaries > product.noOfDependent) {
    //   throw new Error(
    //     `Maximum ${product.noOfDependent} beneficiaries allowed for ${item.userDetails.productId}`,
    //   );
    // }

    // Add to total price
    calculatedTotalPrice += itemTotalPrice; // Already includes beneficiary cost
  }

  // Validate total price
  if (calculatedTotalPrice !== body.totalPrice) {
    throw new Error('Total price mismatch');
  }
};
