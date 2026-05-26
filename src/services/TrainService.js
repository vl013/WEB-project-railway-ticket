export const TrainService = {
  async getTrains() {
    const response = await fetch('/api/trains.json');

    if (!response.ok) {
      throw new Error('Не вдалося завантажити список рейсів');
    }

    return response.json();
  },

  async getTrainById(trainId) {
    const trains = await this.getTrains();
    return trains.find((train) => train.id === trainId);
  }
};
// TODO: Replace mock fetch with real backend API endpoint in production
