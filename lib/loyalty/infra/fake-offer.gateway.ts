import { OfferGateway } from "../models/offer.gateway";
import { Offer } from "../models/offer.model";

export class FakeOfferGateway implements OfferGateway {
  constructor(private readonly delay = 0) {}

  offersByConsumerID = new Map<string, Offer[]>();
  o = new Map<string, Offer>();
  async getEventOffersByConsumerID(consumerID: string): Promise<Offer[]> {
    return new Promise((resolve) => {
      const offersGet = this.offersByConsumerID.get(consumerID);

      resolve(offersGet ? offersGet : []);
    });
  }

  add(fakeOffers: Offer[], consumerID: string) {
    this.offersByConsumerID.set(consumerID, [...fakeOffers]);
  }
}
