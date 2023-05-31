import { useState } from 'react';
import { useAppSelector } from '@redux/hooks';
import { useTranslation } from 'react-i18next';
import { NotFound, PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';
import {
  useGetAllPatientsQuery,
  useGetPatientsForRemoteQuery,
} from 'services/PatientService';
import { PATIENTS_PER_PAGE, PATIENTS_PER_LOAD, local } from '@constants/other';
import { IPatient } from '@components/general/type';

interface IProps {
  searchValue: string;
}

function PatientList({ searchValue }: IProps) {
  const { t } = useTranslation();
  const doctorData = useAppSelector((state) => state.doctorReducer);
  const { data: allPatients, isLoading: isLoadingForLocal } =
    useGetAllPatientsQuery('');
  const { data: patientsForRemote, isLoading: isLoadingForRemote } =
    useGetPatientsForRemoteQuery(doctorData.id);
  const [currentPage] = useState<number>(1);
  const [displayedPatients, setDisplayedPatients] =
    useState<number>(PATIENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const endIndex = displayedPatients;
  const isLoading = isLoadingForLocal || isLoadingForRemote;

  const handleLoadMoreClick = () => {
    setDisplayedPatients(displayedPatients + PATIENTS_PER_LOAD);
  };

  const getFilteredPatients = (
    search: string,
    patients?: IPatient[]
  ): IPatient[] => {
    if (search.trim() !== '') {
      return (patients || []).filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
    return patients || [];
  };

  const patients = doctorData.role === local ? allPatients : patientsForRemote;
  const filteredPatients = getFilteredPatients(searchValue, patients) || [];

  return (
    <>
      {filteredPatients.length > 0 && !isLoading ? (
        <PatientsList>
          {filteredPatients?.slice(startIndex, endIndex).map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              searchValue={searchValue}
            />
          ))}
        </PatientsList>
      ) : (
        <NotFound>
          {searchValue !== '' && !isLoading
            ? `${t('Patients.PatientWithName')} "${searchValue}" ${t(
                'Patients.notFound'
              )}.`
            : `${t('Patients.patients')}  ${t('Patients.notFound')}.`}
        </NotFound>
      )}

      {filteredPatients && endIndex < filteredPatients.length && (
        <LoadMoreButton onClick={handleLoadMoreClick}>
          {t('Patients.loadMore')}
        </LoadMoreButton>
      )}
    </>
  );
}

export default PatientList;
