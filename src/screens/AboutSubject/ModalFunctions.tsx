import { deleteServices, putServices, postServices } from '../../utils/hooks/services';
import { updateMessage } from '../../redux/actions/message';

const template = (setVal, setShowNotes, dispatch, val) => {
    setVal(!val)
    setShowNotes(false)
    dispatch(updateMessage({ body: 'Realizado con éxito', open: true, type: 'success' }))
}

export const updateNote = (setLoading, setVal, val, setShowNotes, infoUserSubj, form, dispatch) => {
    setLoading(true)
    putServices(`user-subject/update/${infoUserSubj.USERSUBJECT}`, form, 'application/json').then(() => {
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}

export const createNote = (setLoading, setInfoUserSubj, infoUserSubj, currentSubj, updater, setUpdater) => {
    setLoading(true)
    postServices('user-subject/create', {
        USERSUBJECT: infoUserSubj.USERSUBJECT,
        chair: infoUserSubj.chair,
        cost: infoUserSubj.cost,
        extra_score: infoUserSubj.extra_score,
        finish: infoUserSubj.finish,
        practicalJobs: infoUserSubj.practicalJobs,
        qualityOfTeachers: infoUserSubj.qualityOfTeachers,
        requirement: infoUserSubj.requirement,
        score: infoUserSubj.score,
        user_id: infoUserSubj.user_id,
        subject_id: currentSubj.id
    }).then(({ data }: any) => {
        setInfoUserSubj({
            ...infoUserSubj,
            finish: 0,
            extra_score: [],
            USERSUBJECT: data.id,
            user_id: data.user_id,
            subject_id: data.subject_id,
            chair: "",
            practicalJobs: 0,
            qualityOfTeachers: 0,
            requirement: 0,
            cost: 0,
            score: 1,
        })
    }).finally(() => {
        setUpdater(!updater)
        setLoading(false)
    })
}
export const deleteNote = (setLoading, setVal, val, setShowNotes, infoUserSubj, dispatch) => {
    setLoading(true)
    deleteServices(`user-subject/delete/${infoUserSubj.USERSUBJECT}`).then(() => {
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}

// sub notes
export const deletePartial = (id, setLoading, setVal, val, setShowNotes, setShowModal2, showModal2, dispatch) => {
    setLoading(true)
    deleteServices(`extra-score/delete/${id}`).then(() => {
        setShowModal2({ ...showModal2, state: false });
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}

export const updateOrCreateScorePartial = (id, setLoading, showModal2, infoUserSubj, setVal, val, setShowModal2, setShowNotes, dispatch) => {
    setLoading(true)
    let method, data
    data = { name: showModal2.name, score: showModal2.score, user_subject_id: infoUserSubj.USERSUBJECT }
    id ? method = putServices(`extra-score/update/${id}`, data, 'application/json') : method = postServices(`extra-score/create`, data, 'application/json')
    method.then(() => {
        setShowModal2({ ...showModal2, state: false });
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}